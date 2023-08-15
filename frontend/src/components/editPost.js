import { useState } from "react";

export default function EditPost({posts,handleClose,load}) {

    const [post,setPost] = useState({"title" : posts.title, "content" : posts.content});

    const handleUpdate = async () => {
        await fetch(`http://localhost:5000/api/user/post?postId=${posts._id}`,
        {
            method : "put",
            "headers" : {
                "Content-Type" : "application/json"
            },
            'body' : JSON.stringify(post)
        })
        load();
        handleClose();
    }

    function  handlePost(e) {
        setPost({...post,[e.target.name] : e.target.value});
    }
    return (
        <div className="container" style={{"maxWidth" : "800px"}}>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" value={post.title} onChange={handlePost}></input>
                        <label>Post</label>
                        <textarea className="form-control" name="content" value={post.content} onChange={handlePost} rows="5" cols="30"></textarea>
                </div>
                <button className="btn btn-primary mt-2" type="button" name="button" onClick={handleUpdate}>Update</button>
            </form>
            </div>
    )
}