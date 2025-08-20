import React from 'react';
import { Grid, CircularProgress, Typography, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

// Changed this file removed loader and created a div which shows no post made.
const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  const isLoading = posts === null || posts === undefined;

  const hasNoPosts = !isLoading && posts.length === 0;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (hasNoPosts) {
    return (
      <Paper style={{ padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h6" color="textSecondary">
          No posts made yet
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
          Be the first to create a memory!
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
