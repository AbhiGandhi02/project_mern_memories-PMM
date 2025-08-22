import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  commentsOuterContainer: {
    padding: '0 15px',
    width: '100%',
  },
  commentsInnerContainer: {
    maxHeight: '150px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  commentInputArea: {
    marginTop: '10px',
    marginRight: '30px',
  },
}));