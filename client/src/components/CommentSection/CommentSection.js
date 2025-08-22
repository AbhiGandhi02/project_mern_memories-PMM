import React, { useState } from 'react';
import { Typography, TextField, Button, Divider, IconButton } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';

import { commentPost, deleteComment } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleComment = () => {
    // This now correctly uses 'firstName' to create the comment string
    const finalComment = `${user.result.firstName}: ${comment}`;
    dispatch(commentPost(finalComment, post._id));
    setComment('');
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment(post._id, commentId));
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <Divider style={{ width: '90%', margin: '10px 0' }} />
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="body2">Comments</Typography>
        {post?.comments?.map((c) => (
          <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="caption">
              <strong>{c.name}</strong>&nbsp;{c.text}
            </Typography>
            {user?.result?.firebaseUid === c.creator && (
              <IconButton size="small" onClick={() => handleDelete(c._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        ))}
      </div>
      {user?.result && (
        <div className={classes.commentInputArea}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Post Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;