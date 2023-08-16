import { useState } from "react";
import Navbar from "../components/navbar";
import { ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function Compose() {
    const navigate = useNavigate();
    const [post,setPost] = useState({"title" : "", "content" : ""});

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/user/post/" + localStorage.getItem("userId"),{
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json"
            },
            "body" : JSON.stringify(post)
        })

        const json = await response.json();

        if (json.success) {
            navigate('/home')
        }
    }

    function  handlePost(e) {
        setPost({...post,[e.target.name] : e.target.value});
    }
    return (
        <>
            <Navbar />
            <div className="container" style={{"maxWidth" : "800px", "marginTop" : "30px"}}>
            <h1 align="center" style={{marginBottom : "20px"}}>Compose</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" value={post.title} onChange={handlePost}></input>
                        <label>Post</label>
                        <textarea className="form-control" name="content" value={post.content} onChange={handlePost} rows="8" cols="30"></textarea>
                </div>
                <button className="btn btn-primary mt-2" type="submit" name="button">Publish</button>
            </form>
            </div>
        </>
    )
};