import React from 'react';
import { Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';

const PostPreview = ({ post }) => {
    const convertDateToElapsedDate = (date) => {
        const now = new Date(Date.now());
        const current = new Date(date);

        const diff = now.getTime() - current.getTime();
        return (diff / 1000 / 60 / 60).toFixed(0);
    }
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction='row'
        alignItems='flex-start'
        justifyContent='flex-start'
        spacing={3}
        style={{ width: '100%', padding: 12, marginTop: 24 }}
      >
        {/* Upvote / votes / downvote*/}
        <Grid item spacing={1} style={{ maxWidth: 128 }}>
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
        <Grid item style={{maxWidth: '80%'}}>
          <Grid container direction='column' alignItems='flex-start'>
            <Grid item>
              <Typography variant='body1'>
                Posted by <b>{post.owner}</b>{' '}
                {convertDateToElapsedDate(post.createdAt)} hours ago
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h2'>{post.title}</Typography>
            </Grid>
            <Grid item style={{maxHeight: 32, overflowY: 'hidden', overflowX: 'hidden'}}>
              <Typography variant='body1'>{post.contents}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostPreview;
