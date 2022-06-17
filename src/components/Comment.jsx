import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import formatDatePosted from '../lib/formatDatePosted'

const Comment = ({ comment }) => {
  return (
    <Paper style={{ width: '100%', minHeight: 128, marginTop: 20, padding: 16,}} elevation={1}>
      <Grid container spacing={1} direction='column'>
        <Grid item>
          <Typography variant='body1'>
            <b>{comment.owner}</b> - {formatDatePosted(comment.createdAt)} hours
            ago
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2'>
            {comment.content}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
