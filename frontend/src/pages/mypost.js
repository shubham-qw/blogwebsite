import Navbar from "../components/navbar";
import { useState,useEffect } from "react";
export default function MyPost () {
    const [posts,setPosts] = useState([]);
   
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
        <div className="container">
        {posts.length != 0 ? posts.map((post) => {
            return (
                <div className="mt-5" style={{maxWidth : "500px"}}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>posted on {(post.createdAt)}</p>
                    <span>{post.likes.length} likes</span>  <button className="btn btn-info">show comments</button>
                </div>
            )
        }
        ) : ""}
        </div>
        </>
    )
}