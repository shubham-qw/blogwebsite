import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import { useUserState } from "../components/userContext";
import { useEffect,useState } from 'react';


export default function SeePost({post,type,handleClose,load}) {
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
            body: JSON.stringify({content : comment,userName : localStorage.getItem("userName")})
        })
        load();
        handleClose();
    }
    
    const handleLike = async (id) => {
        await fetch (`http://localhost:5000/api/like?userId=${user._id}&postId=${id}`, {
            method : "get",
        })
        load();
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
        <div style={{padding : "10px"}}>
            <h1 style={{"marginBottom" : "25px"}}>Comments</h1>
        {/* <h1 align="center">{post.title}</h1>
        <p align="center">{post.content}</p>
        <p >{type == "Viewer" ?<Button onClick={()=> {handleLike(post._id)}} startIcon={post.likes.length}>{like ? <FavoriteIcon/> : <FavoriteBorderIcon/>}</Button> : <FavoriteIcon/>}</p> */}
        {type == "Viewer" ? <div style={{"marginBottom" : "20px"}}><input type="text" onChange={onHandleChange} placeholder='Type a comment here'></input><Button onClick={()=> {submitComment(post._id)}}>Submit</Button></div> : ""}
        {
           post.comment.length > 0 ? post.comment.map((comment,indx) => {
            return (
                <div style={{borderBottom : "1px solid black", padding : "5px"}}>
                    <dl>
                        <dt>{comment.userName}</dt>
                        <dd>{comment.content}</dd>
                    </dl>
                </div>

            )
            }) : "No Comments"
        }
        

        </div>
    )
}