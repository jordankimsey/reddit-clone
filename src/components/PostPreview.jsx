import React from 'react';
import { ButtonBase, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import { Paper } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import formatDatePosted from '../lib/formatDatePosted';

const PostPreview = ({ post }) => {
  const router = useRouter();
  
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction='row'
        alignItems='flex-start'
        justifyContent='flex-start'
        flexWrap='nowrap'
        spacing={3}
        style={{
          padding: 12,
          marginTop: 24,
        }}
      >
        {/* Upvote / votes / downvote*/}
        <Grid item style={{ maxWidth: 128 }}>
          <Grid container direction='column' alignItems='center'>
            <Grid item>
              <IconButton color='inherit'>
                <ArrowUpwardIcon style={{ maxWidth: 24 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid
                container
                alignItems='center'
                direction='column'
                justifyContent='center'
              >
                <Grid item>
                  <Typography variant='body1'>
                    {(post.upvotes - post.downvotes).toString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>Votes</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <IconButton color='inherit'>
                <ArrowDownwardIcon style={{ maxWidth: 24 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {/* content Preview */}
        <Grid item>
          <ButtonBase onClick={() => router.push(`/post/${post.id}`)}>
            <Grid container direction='column' alignItems='flex-start'>
              <Grid item>
                <Typography variant='body1'>
                  Posted by <b>{post.owner}</b>{' '}
                  {formatDatePosted(post.createdAt)} hours ago
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h2'>{post.title}</Typography>
              </Grid>
              <Grid
                item
                style={{
                  maxHeight: 32,
                  overflowY: 'hidden',
                  overflowX: 'hidden',
                }}
              >
                <Typography variant='body1'>{post.contents}</Typography>
              </Grid>
              {post.image && (
                <Grid item>
                  <Image
                    src={post.image}
                    alt={post.title}
                    height={540}
                    width={980}
                    layout='intrinsic'
                  />
                </Grid>
              )}
            </Grid>
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostPreview;
