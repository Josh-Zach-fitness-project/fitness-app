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
        } else {alert('Incorrect Username or Password, please try again')}
        setUsername("");
        setPassword("");
    }
    
    return(
        <>
        <div className="log-reg">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="inp-boxes">
            <input
            placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
            placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit"
            className="button-log-reg"
            >Login</button>
        </form>
        </div>
        </>
    )
}

export default Login;