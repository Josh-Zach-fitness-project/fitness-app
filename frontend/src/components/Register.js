import React, { useState } from "react";
import { authenticateNewUser } from "../api/authentication";

const Register = ({setToken, setIsLoggedIn, setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userToRegister = {username: username, password: password};
        const data = await authenticateNewUser(userToRegister);
        if(data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(username);
        } 
        setUsername("");
        setPassword("");
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
            placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit"
            
            >Submit</button>
        </form>
        
        </>
    )
}

export default Register;