import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import { useUserState } from "./userContext";

import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
export default function Navbar() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const user = useUserState();
    const logOut = async () => {
        cookies.remove("token");
        navigate("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid" style={{ "height": "70px", "backgroundColor": 'black' }}>
                    <Link className="navbar-brand" to="#">Blogger</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Stack spacing={2} direction="row">
                            <Button variant="text"><Link className="btn nav-link active  text-light fs-6" aria-current="page" to="/home">Home</Link></Button>
                            <Button variant="text"><Link className="btn nav-link  text-light fs-6" to="/compose">Compose</Link></Button>
                            <Button variant="text"><Link className="btn nav-link  text-light fs-6" to="/mypost">Posts</Link></Button>
                        </Stack>


                        <div className="mt-2" style={{ "marginLeft": "auto" }}>
                        
                            <ul className="navbar-nav">
                                <li className="nav-item me-3"> <p className="btn text-white fs-6 ">{user.name}</p></li>
                                {user ? <li className="nav-item mx-2">  <button className="btn btn-light bg-pink" onClick={logOut}>Sign out</button></li> : ""}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}