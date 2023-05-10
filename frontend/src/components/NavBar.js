import React from 'react';
import { NavLink} from 'react-router-dom';

const NavBar = ({setIsLoggedIn, setUser, setToken}) => {
    
    return(
    <>
    <nav id='navbar'>
        <NavLink to='/' id='navFeature'>Welcome</NavLink>
        <NavLink to='/routines' id='navFeature'>Rountines</NavLink>
        <NavLink to='/myroutines' id='navFeature'>My Routines</NavLink>
        <NavLink to='/activities' id='navFeature'>Activities</NavLink>
        <button
        onClick={() => {
          setIsLoggedIn(false);
          setUser({});
          setToken('');
          localStorage.removeItem('token');
        //   navigate('/');
        }}
      >
        Logout
      </button>
    </nav>
    </>
    )
}

export default NavBar;