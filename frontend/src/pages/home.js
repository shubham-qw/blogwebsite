import Navbar from "../components/navbar";
import * as React from 'react';
import { useState, useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useUserState } from "../components/userContext";
import PostCard from "../components/postCard";





export default function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState({ "name": "" });
    const [comment,setComment] = useState(false)
    const [write,setWrite] = useState({"content" : ""})
    const [force,setForceRender] = useState(false);
    const [something,setSomething] = useState({status:false, id : ""});
    const user = useUserState();
  
    function onSearch(e) {
        setSearch({ ...search, [e.target.name]: e.target.value })
    }

    function setCom() {
        if (comment) {
            setComment(false);
        }
        else {
            setComment(true)
        }
    }

    const load_post = async () => {
        const response = await fetch("http://localhost:5000/api/user/post/" + (!something.status ?  localStorage.getItem("userId") : something.id), {
            "method" : "GET"
        })

        const json = await response.json();

        if (json.success) {
            setPosts(json.posts);
        }

    }

    const submitSearch = async () => {

        const response = await fetch("http://localhost:5000/api/search", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(search)
        })

        const json = await response.json();
        if (json.success) {
            setSomething({id : json.user_id, status : true});
            setForceRender(force ? false : true);
        }
        else {
            setPosts([])
        }
    }

    const handleLike = async (id) => {
        const response = await fetch (`http://localhost:5000/api/like?userId=${user._id}&postId=${id}`, {
            method : "get",
        })

    }

    

    const onWriteSubmit = (e) => {
        e.preventDefault();


    }

    function changeWrite (e) {
        setWrite({...write,[e.target.name] : e.target.value})
    }

    useEffect(() => {
        load_post()
    },[posts])

    return (
        <>
            <Navbar name={''} />
            <div className="container" >
                <div style={{ "maxWidth": "500px", "margin": "auto" }}>
                    <InputGroup>
                        <Form.Control
                            placeholder="search other bloggers"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={search.name}
                            name="name"
                            onChange={onSearch}
                        />
                        <Button id="button-addon2" onClick={submitSearch}>
                            search
                        </Button>
                    </InputGroup>
                </div>
                <div style={{"display" : "flex","flexDirection" : "column","justifyContent" : "center", "alignItems" : "center", "marginTop" : "50px"}}>
                    {posts.length != 0 ? posts.map((post) => {
                        
                        return (
                            <div>
                            <PostCard
                                post={post}
                                type={"Viewer"}
                            />
                            {/* <div className="mt-5" style={{ display: "flex","flexDirection":"column","justifyContent" : "center", "alignItems" : "center",width: "500px", "borderBottom" : "1px solid black"}}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <p>posted on {(post.createdAt)}</p>
                                <span>{post.likes.length} <button onClick={()=>handleLike(post._id)}>likes</button></span>
                                { comment ? <div>
                                    {post.comment.length != 0 ? post.comment.map((com) => {
                                        return (
                                            <div>
                                                <p style={{"textAlign" : "center"}}>{com.content}</p>
                                            </div>
                                        )
                                    }) : ""}
                                    <div style={{"marginBottom" : "3px"}}>
                                        <form>    
                                        <input style={{"width" : "300px"}} type='text' placeholder="Write a comment here" value={write.content} name="content" onChange={changeWrite}></input>
                                        <button type="button" className="btn btn-info btn-sm">post comment</button>
                                        </form>
                                    </div>
                                </div> : ""}
                                  <button className="btn mb-5" onClick={setCom}><AiOutlineComment style={{"fontSize" : "40px"}}/></button>
                            </div> */}
                            </div>
                        )
                    }) : ""}
                </div>
            </div>
        </>
    )
}