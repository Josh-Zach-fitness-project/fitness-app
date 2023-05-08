import React from 'react';
import { NavLink} from 'react-router-dom';

const NavBar = () => {
    return(
    <>
    <nav id='navbar'>
        <NavLink to='/' id='navFeature'>Welcome</NavLink>
        <NavLink to='/routines' id='navFeature'>Rountines</NavLink>
        <NavLink to='/myroutines' id='navFeature'>My Routines</NavLink>
        <NavLink to='/activities' id='navFeature'>Activities</NavLink>
    </nav>
    </>
    )
}

export default NavBar;