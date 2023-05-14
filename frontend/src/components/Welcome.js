import React from 'react';
import Register from './Register';
import Login from './Login';


const Welcome = ({token, setToken, isLoggedIn, setIsLoggedIn, user, setUser}) => {
    if(!isLoggedIn){
        return(
        <>
        <div className='home-page-background'>
        <div id='signin'>Please log in or register</div>
            <section id='credentials'>
                <Register 
                    className="register"
                    token={token} 
                    setToken={setToken} 
                    isLoggedIn={isLoggedIn} 
                    setIsLoggedIn={setIsLoggedIn} 
                    user={user} 
                    setUser={setUser} 
                    />
                <Login 
                    className="register"
                    token={token} 
                    setToken={setToken} 
                    isLoggedIn={isLoggedIn} 
                    setIsLoggedIn={setIsLoggedIn} 
                    user={user} 
                    setUser={setUser} 
                    />
            </section>
        </div>
        </>
        )
    } else {
        return(
            <img id='image' src='https://media.gettyimages.com/id/1064128576/photo/young-woman-running-on-mountain.jpg?s=612x612&w=0&k=20&c=gdF0TDpKSKCaoIF7MZrh2tJGdthgC9ESzd_alNllWYU='></img>
            )
    }
}

export default Welcome;