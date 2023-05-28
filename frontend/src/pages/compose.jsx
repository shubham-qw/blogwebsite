import { useState } from "react";
import Navbar from "../components/navbar";


export default function Compose() {
    const [post,setPost] = useState({"title" : "", "content" : ""});

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    function  handlePost(e) {
        setPost({...post,[e.target.name] : e.target.value});
    }
    return (
        <>
            <Navbar />
            <div className="container" style={{"maxWidth" : "1000px"}}>
            <h1>Compose</h1>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" value={post.title} onChange={handlePost}></input>
                        <label>Post</label>
                        <textarea className="form-control" name="content" value={post.content} onChange={handlePost} rows="5" cols="30"></textarea>
                </div>
                <button className="btn btn-primary mt-2" type="submit" name="button">Publish</button>
            </form>
            </div>
        </>
    )
};