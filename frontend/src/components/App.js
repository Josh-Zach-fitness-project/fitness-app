import {React, useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import Activities from './Activities';
import Routines from './Routines';
import NavBar from './NavBar';
import Welcome from './Welcome';
import { fetchActivities, fetchRoutines } from '../api';

const App = () => {
    const [routines, setRoutines] = useState([]);
    const [filteredRoutines, setFilteredRoutines] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    // const [routineActivities, setRoutineActivities] = useState([]);
    const [token, setToken] = useState(localStorage.token);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getData = async () => {
            const fetchedRoutines = await fetchRoutines();
            setRoutines(fetchedRoutines);
            const fetchedActivities = await fetchActivities();
            setAllActivities(fetchedActivities);
            // const {activities: {activityId, count, duration}} = routines;
            // const fetchedRoutineActivities = await attachRoutineActivities({activityId, count, duration});
            // setRoutineActivities(fetchedRoutineActivities);
            if(token) {
                setIsLoggedIn(true)
            }
        }
        getData();
    }, [])


    useEffect(() => {
        const filtered = routines.filter((routine) => {
            return routine.creatorId === user.id
        });
        setFilteredRoutines(filtered)
        
}, [routines])

    return(
    <>
    <NavBar setIsLoggedIn={setIsLoggedIn} setUser={setUser} setToken={setToken} isLoggedIn={isLoggedIn}/>
    <Routes>
        <Route path='/' element={<Welcome token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />}></Route>
        <Route path='/activities' element={<Activities allActivities={allActivities}/>}></Route>
        <Route path='/routines' element={<Routines filteredRoutines={filteredRoutines} setFilteredRoutines={setFilteredRoutines} routines={routines} user={user} isLoggedIn={isLoggedIn} token={token} setRoutines={setRoutines} allActivities={allActivities}/>}></Route>
    </Routes>
    </>
    )
}

export default App;