import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { useUserState } from "../components/userContext";
import { useEffect,useState } from 'react';


export default function SeePost({post,type,handleClose}) {
    const [comment,setComment] = useState("");
    const user = useUserState();

    const onHandleChange = (e) => {
        setComment(e.target.value)
    }

    const submitComment = async (id) => {
        await fetch(`http://localhost:5000/api/user/comment/${user._id}.${id}`, {
            "method" : 'post',
            'headers' : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({content : comment})
        })
        handleClose();
    }
    
    const handleLike = async (id) => {
        await fetch (`http://localhost:5000/api/like?userId=${user._id}&postId=${id}`, {
            method : "get",
        })

        handleClose();

    }

    const [like,setLike]  = useState(false);


  const set_like = () => {
    for (let i=0; i<post.likes.length; i++) {
      if (post.likes[i].user == user._id) {
        setLike(true);
      }
    }

  }

   useEffect(() => {
    set_like()
   },[]) 

    return (
        <div>
        <h1 align="center">{post.title}</h1>
        <p align="center">{post.content}</p>
        <p >{type == "Viewer" ?<Button onClick={()=> {handleLike(post._id)}} startIcon={post.likes.length}>{like ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</Button> : <FavoriteIcon/>}</p>
        {type == "Viewer" ? <div><input type="text" onChange={onHandleChange}></input><Button onClick={()=> {submitComment(post._id)}}>Submit</Button></div> : ""}
        {
           post.comment.length > 0 ? post.comment.map((comment) => {
            return (
                <p>
                    {comment.content}
                </p>

            )
            }) : "No Comments"
        }
        </div>
    )
}