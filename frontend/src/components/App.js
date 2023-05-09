import {React, useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import Activities from './Activities';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import NavBar from './NavBar';
import Welcome from './Welcome';
import { fetchActivities, fetchRoutines } from '../api';

const App = () => {
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState(localStorage.token);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});


    useEffect(() => {
        const getData = async () => {
            const fetchedRoutines = await fetchRoutines();
            setRoutines(fetchedRoutines);
            const fetchedActivities = await fetchActivities();
            setActivities(fetchedActivities)
        }
        getData();
    }, [])
    return(
    <>
    <NavBar />
    <Routes>
        <Route path='/' element={<Welcome token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />}></Route>
        <Route path='/activities' element={<Activities activities={activities}/>}></Route>
        <Route path='/routines' element={<Routines routines={routines} />}></Route>
        <Route path='/my-routines' element={<MyRoutines />}></Route>
    </Routes>
    </>
    )
}

export default App;