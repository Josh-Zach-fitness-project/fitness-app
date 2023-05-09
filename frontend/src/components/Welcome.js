import React from 'react';
import Register from './Register';

const Welcome = ({token, setToken, isLoggedIn, setIsLoggedIn, user, setUser}) => {
    return(
    <>
    <div>Welcome Page</div>
    <Register token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
    </>
    )
}

export default Welcome;