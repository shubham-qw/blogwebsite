import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";

export default function Home () {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const logOut = async () => {
        cookies.remove("token");
        navigate("/");
    }
    return (
        <>
        <h1>Home Page</h1>
        <button onClick={logOut}>Log out</button>
        </>
    )
}