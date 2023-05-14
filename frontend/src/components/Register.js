import React, { useState } from "react";
import { authenticateNewUser } from "../api/authentication";

const Register = ({setToken, setIsLoggedIn, setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await authenticateNewUser({username: username, password: password});
        if(data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            setUser(data.user);
        } else {alert('That username is taken!')}
        setUsername("");
        setPassword("");
    }

    return(
        <>
        <div className="log-reg">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="inp-boxes">
            <input
            placeholder="Username" 
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
            required
            ></input>
            <input
            type='text'
            minLength='8'
            placeholder="Password(min. 8 characters)" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)}
            required
            ></input>
            <button type="submit"
            className="button-log-reg"
            >Submit</button>
        </form>
        
        </div>
        </>
    )
}

export default Register;