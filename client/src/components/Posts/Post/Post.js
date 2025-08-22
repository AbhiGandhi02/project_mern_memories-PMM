import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Collapse } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CommentIcon from '@material-ui/icons/Comment';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import CommentSection from '../../CommentSection/CommentSection';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {user?.result?.firebaseUid === post?.creator && (
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* This line displays the like button and the like count */}
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" />&nbsp; Like {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => setShowComments(!showComments)}>
          <CommentIcon fontSize="small" />&nbsp; Comment
        </Button>
        {user?.result?.firebaseUid === post?.creator && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentSection post={post} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;