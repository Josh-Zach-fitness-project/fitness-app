import React from 'react';
import { NavLink} from 'react-router-dom';

const NavBar = ({setIsLoggedIn, setUser, setToken, isLoggedIn}) => {
    
  if(isLoggedIn){
    return(
      <>
      <div id='navbar'>

      <h1 id='main-title'>Fitness Tracker</h1>
        <nav id='navbar-menu'>
            <NavLink to='/' id='navFeature'>Home</NavLink>
            <NavLink to='/routines' id='navFeature'>Rountines</NavLink>
            <NavLink to='/activities' id='navFeature'>Activities</NavLink>
        </nav>
            <button
            id='logout-button'
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
      </div>
    </>

)
      } else {
        return (

          <>
          <div id='navbar'>
          <h1 id='main-title'>Fitness Tracker</h1>
          <nav id='navbar-menu'>
          <NavLink to='/' id='navFeature'>Home</NavLink>
          <NavLink to='/routines' id='navFeature'>Rountines</NavLink>
          <NavLink to='/activities' id='navFeature'>Activities</NavLink>
          
          </nav>
          </div>
          </>
          )
      }
}

export default NavBar;