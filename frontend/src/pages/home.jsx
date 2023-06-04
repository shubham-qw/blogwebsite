import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState({ "name": "" });
    const [comment,setComment] = useState(false)
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
            setPosts(json.posts);
        }
        else {
            setPosts([])
        }
    }


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
                            <div className="mt-5" style={{ display: "flex","flexDirection":"column","justifyContent" : "center", "alignItems" : "center",width: "500px", "borderBottom" : "1px solid black"}}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <p>posted on {(post.createdAt)}</p>
                                <span>{post.likes.length} likes</span>
                                { comment ? <div>
                                    {post.comment.length != 0 ? post.comment.map((com) => {
                                        return (
                                            <div>
                                                <p>{com.content}</p>
                                            </div>
                                        )
                                    }) : ""}
                                    <div>
                                        <input></input>
                                    </div>
                                </div> : ""}
                                  <button className="btn mb-5" onClick={setCom}><i style={{"font-size":"24px"}} className='far'>&#xf4ad;</i></button>
                            </div>
                        )
                    }) : <h1># Trending Blogs</h1>}
                </div>
            </div>
        </>
    )
}