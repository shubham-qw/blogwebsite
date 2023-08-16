import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SeePost from '../pages/post';
import { useEffect, useState } from 'react';
import { useUserState } from './userContext';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditPost from './editPost';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  minHeight: "50vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  minHeight: "30vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostCard({ post, type,load }) {
  const user = useUserState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [like,setLike]  = useState(false);
  const [postModal, setPostModal] = useState({});
  const handleOpen = (post) => {
    setPostModal(post);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/user/post?id=${id}`, {
      method : "delete"
    })
    load();
  }

  const set_like = () => {
    for (let i=0; i<post.likes.length; i++) {
      if (post.likes[i].user == user._id) {
        return true;
      }
    }
    return false;
  }

  const handleLike = async (id) => {
    await fetch (`http://localhost:5000/api/like?userId=${user._id}&postId=${id}`, {
        method : "get",
    })
    load();
    handleClose();

}

  const handleClose1 = () => setOpen1(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };

 React.useEffect(() => {
 }) 
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SeePost
              post={postModal}
              type={type}
              handleClose={handleClose}
              load={load}
            ></SeePost>
          </Box>
        </Modal>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <EditPost 
            posts={post}
            handleClose={handleClose1}
            load={load}
            />
          </Box>
        </Modal>
      </div>
      <Box sx={{ minWidth: 500 }}>
      <Card sx={{ minWidth: 320, maxWidth: 600 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 , mb: 1.5 }}  color="text.secondary" gutterBottom>
            {post.userId.name}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
            {post.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }}variant="body2">
          <div style={{display: "flex"}}>
            {post.content}
            </div>  
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <div style={{display : "flex", width : "100%" }}>
          <Stack direction="row" spacing={2} style={{display : "flex", width : "100%"}}>
            <div>{type == "User" ?<FavoriteIcon /> : <Button onClick={() =>handleLike(post._id)} startIcon={post.likes.length}>{set_like() ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</Button>}</div>
            <div><Button onClick={() => handleOpen(post)} startIcon={post.comment.length}><CommentIcon /></Button></div>
            {/* <Item><Button size="small" onClick={() => handleOpen(post)}>Show More</Button></Item> */}
            {
      type == 'User' ?<div style={{marginLeft : "auto"}}> <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <Button onClick={handleOpen1}>Edit</Button>
      <Button onClick={()=> {handleDelete(post._id)}}>Delete</Button>
    </ButtonGroup> </div>: ""
        }
          </Stack>
          </div>
        </CardActions>
        
      </Card>
      </Box>
    </>
  );
}