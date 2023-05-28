import Navbar from "../components/navbar";
import { useState,useEffect } from "react";
export default function Home () {
    const [user, setUser] = useState("");
   
    const load_user = async () => {
        const response = await fetch("http://localhost:5000/api/user/" + localStorage.getItem("userId"), {
            "method" : "GET"
        })

        const json = await response.json();

        if (json.success) {
            setUser(json.userName);
        }
    }
    useEffect(() => {
        load_user();
    }, [])
    return (
        <>
        <Navbar name={user}/>
        <div className="container">
        <span className="d-flex justify-content-center align-items-center"><h1 className="fs-1">My Posts</h1></span>
        </div>
        </>
    )
}