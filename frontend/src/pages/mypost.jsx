import Navbar from "../components/navbar";
import { useState,useEffect } from "react";
import PostCard from "../components/postCard";
export default function MyPost () {
    const [posts,setPosts] = useState([]);
    const [comment,setComment] = useState(false)

    function setCom() {
        if (comment) {
            setComment(false);
        }
        else {
            setComment(true)
        }
    }
   
    const load_post= async () => {
        const response = await fetch("http://localhost:5000/api/user/post/" + localStorage.getItem("userId"), {
            "method" : "GET"
        })

        const json = await response.json();

        if (json.success) {
            setPosts(json.posts);
        }
    }
    useEffect(() => {
        load_post();
    }, [])
    return (
        <>
        <Navbar name={''}/>
        <div  className="container" style={{height : 'auto', display : "flex", flexWrap : "wrap", alignContent : "space-evenly"}}>
        {posts.length != 0 ? posts.map((post) => {
            return (
                <>
                <div style={{margin : "50px", height : 'auto'}}>
                <PostCard post={post} type="User" load={load_post}/>
                </div>
                {/* <div className="mt-5" style={{maxWidth : "500px"}}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>posted on {(post.createdAt)}</p>
                    <p>{post.likes.length} likes</p>
                    <button className="btn mb-5" style={{"paddingLeft" : "3px","border" : "1px solid black"}}onClick={setCom}>Show Comments  <AiOutlineComment style={{"fontSize" : "40px"}}/></button>
                </div> */}
                </>
            )
        }
        ) : ""}
        </div>
        </>
    )
}