import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ImageDropZone from '../src/components/ImageDropZone';
import { Storage, API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { createPost } from '../src/graphql/mutations';
import { useRouter } from 'next/router';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

const create = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (file) {
      //user uploaded file
      //send a request to upload to an s3 bucket
      try {
        const imagePath = uuidv4();
        await Storage.put(imagePath, file, {
          contentType: file.type, // contentType is optional
        });
        //Once File is uploaded, Upload post
        const createNewPostInput = {
          title: data.title,
          contents: data.content,
          image: imagePath,
          upvotes: 0,
          downvotes: 0,
        };
        const createNewPost = await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        console.log('New Post created successfully:', createNewPost);
        router.push(`/post/${createNewPost.data.createPost.id}`);
      } catch (error) {
        console.log('Error uploading file: ', error);
      }
    }
  };

  return (
    <Container maxWidth='md'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <TextField
              id='title'
              fullWidth
              label='Post Title'
              variant='outlined'
              type='text'
              error={errors.title ? true : false}
              helperText={errors.title && errors.title.message}
              {...register('title', {
                required: {
                  value: true,
                  message: 'Please enter a title',
                },
                maxLength: {
                  value: 1000,
                  message: 'Please make sure content is under 1000 characters.',
                },
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              id='content'
              label='Post Content'
              variant='outlined'
              type='text'
              fullWidth
              multiline
              error={errors.content ? true : false}
              helperText={errors.content && errors.content.message}
              {...register('content', {
                required: {
                  value: true,
                  message: 'Please enter content',
                },
                maxLength: {
                  value: 120,
                  message: 'Please enter a title less than 120 characters.',
                },
              })}
            />
          </Grid>

          <Grid item>
            <ImageDropZone file={file} setFile={setFile} />
          </Grid>

          <Button
            type='submit'
            style={{ marginTop: 10 }}
            variant='contained'
            color='inherit'
          >
            <Typography color='#1b2330'>Create Post</Typography>
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default create;
