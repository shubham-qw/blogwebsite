import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../pages/auth.css";
import {  useUserDispatch } from "../components/userContext";

const newCred = {"password" : "", "name" : "", "email" : ""};
const oldCred = {"email" : "", "password" : ""};

export default function Auth() {
    const cookies = new Cookies();
    const [newUser, setNewuser] = useState(false);
    const [cred,setCred] = useState(oldCred);
    const [url,setUrl] = useState("");
    const navigate = useNavigate();
    const dispatch = useUserDispatch();
    function onNewUser() {
        if (newUser) {
            setNewuser(false);
            setCred(oldCred);
            setUrl("");
        }
        else {
            setNewuser(true);
            setCred(newCred);
            setUrl("/register");
        }
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/user" + url, {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json"
            },
            "body" : JSON.stringify(cred)
        })

        const server = await response.json();

        if (server) {
          
            if (server.success) {
                alert(server.message);
                toast.success(server.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                navigate("/home");
                console.log(server.token);
                cookies.set("token", server.token, {
                    path : "/",
                    expires : new Date(Date.now() + (1000*86400)) 
                });
                console.log(server);
                localStorage.setItem("userId", server.userId); 
                localStorage.setItem("userName", server.userName)
                dispatch({type : "login", user : {name : server.userName, _id : server.userId}});        
            }
            else {
                toast.error(server.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    }

    function onChange(e) {
        setCred({...cred,[e.target.name] : e.target.value});
    }

    const check_auth = async () =>  {
        const token = cookies.get('token');
        const response = await fetch("http://localhost:5000/user?token=" + token);
        const json = await response.json();

        if (json.success) {
            localStorage.setItem("userId", json.userId);
            navigate("/home");
        }
    }

    useEffect(() => {
        check_auth();
    },[])

    return (
        <>
        
            <div className="container authBox">
            <ToastContainer />
                <form onSubmit={handleSubmit} className="mx-2 mb-2 m-auto mt-2" style={{"padding" : "20px"}}>
                    {newUser ? <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputName1" className="form-label">Enter Username</label>
                        <input type="text" className="form-control" id="exampleInputName1" value={cred.name} name="name" onChange={onChange}></input>
                    </div> : ""}
                    <div className="mb-3 mt-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" value={cred.email} name="email" onChange={onChange}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={cred.password} name="password" onChange={onChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary mx-3">Submit</button>
                    {newUser ?  <span onClick={onNewUser}>already a user</span>:  <span onClick={onNewUser}>New user</span>}
                </form>

            </div>
        </>
    )
}