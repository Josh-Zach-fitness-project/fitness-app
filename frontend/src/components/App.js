import {React, useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import Activities from './Activities';
import Routines from './Routines';
import NavBar from './NavBar';
import Welcome from './Welcome';
import { fetchActivities, fetchRoutines, getMyRoutines } from '../api';
import { getMe } from '../api/authentication';

const App = () => {
    const [routines, setRoutines] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    // const [routineActivities, setRoutineActivities] = useState([]);
    const [token, setToken] = useState(localStorage.token);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [allMyRoutines, setAllMyRoutines] = useState([]);



    useEffect(() => {
        const getData = async () => {
            const fetchedRoutines = await fetchRoutines();
            setRoutines(fetchedRoutines);
            const fetchedActivities = await fetchActivities();
            setAllActivities(fetchedActivities);
            if(token) {
                const me = await getMe(token);
                setUser(me);
                setIsLoggedIn(true)
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const username = user.username;
                const myRoutinesFunct = async () => {

                    const fetchedAllMyRoutines = await getMyRoutines({username, token});
                    console.log('^^^^^^^', fetchedAllMyRoutines);
                    setAllMyRoutines(fetchedAllMyRoutines);
                    console.log('$$$$$$', allMyRoutines)
                }
                myRoutinesFunct()
    }, [isLoggedIn])


    return(
    <>
    <NavBar setIsLoggedIn={setIsLoggedIn} setUser={setUser} setToken={setToken} isLoggedIn={isLoggedIn}/>
    <Routes>
        <Route path='/' element={<Welcome token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />}></Route>
        <Route path='/activities' element={<Activities allActivities={allActivities}/>}></Route>
        <Route path='/routines' element={<Routines allMyRoutines={allMyRoutines} routines={routines} user={user} isLoggedIn={isLoggedIn} token={token} setRoutines={setRoutines} allActivities={allActivities} setAllMyRoutines={setAllMyRoutines}/>}></Route>
    </Routes>
    </>
    )
}

export default App;