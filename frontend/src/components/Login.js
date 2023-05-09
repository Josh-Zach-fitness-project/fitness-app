import { React, useState } from "react";
import { authenticateUser } from "../api/authentication";

const Login = ({setToken, setIsLoggedIn, setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await authenticateUser({username: username, password: password});
        if(data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(data.user);
        } 
        setUsername("");
        setPassword("");
    }

    return(
        <>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
            placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit"
            
            >Login</button>
        </form>
        
        </>
    )
}

export default Login;