import React, { useState } from 'react';
import CreateRoutineForm from './CreateRoutineForm';

const Routines = ({routines, user, isLoggedIn, token}) => {
    const [myRoutines, setMyRoutines] = useState(false)
    console.log("This is isLoggedIn", isLoggedIn)
    const filteredRoutines = routines.filter((routine) => {
        routine.creatorId === user.id
    });
    if (!isLoggedIn) {
        return(
        <>
        <div>Routines Page</div>
        <section>
            <h1>These are the Public Routines</h1>
            {routines.length ? routines.map((routine) => {
                return (
                    <article key={routine.id} id='singleRoutine'>
                        <h2>{routine.name}</h2>
                        <p>{routine.goal}</p>
                        <p>{routine.creatorName}</p>
                        {/* <p>{routine.activities}</p> */}
                    </article>
                )
                
            }) : <h1>No routines to display</h1>}
        </section>
        </>
        )
    } else {
        if (!myRoutines) {
            return(
                <>
                <div>Routines Page</div>
                <CreateRoutineForm token={token}/>
                <section>
                    <button
                    onClick={() => {
                        setMyRoutines(true);
                    }}
                    >View My Routines</button>
                    <h1>These are the Public Routines</h1>
                    {routines.length ? routines.map((routine) => {
                        return (
                            <article key={routine.id} id='singleRoutine'>
                                <h2>{routine.name}</h2>
                                <p>{routine.goal}</p>
                                <p>{routine.creatorName}</p>
                                {/* <p>{routine.activities}</p> */}
                            </article>
                        )
                        
                    }) : <h1>No routines to display</h1>}
                </section>
                </>
                )
        } else {
            return(
                <>
                <div>My Routines Page</div>
                <CreateRoutineForm token={token}/>
                <section>
                    <button
                    onClick={() => {
                        setMyRoutines(false);
                    }}
                    >View Public Routines</button>
                    <h1>These are my Routines</h1>
                    {filteredRoutines.length ? routines.map((routine) => {
                        return (
                            <article key={routine.id} id='singleRoutine'>
                                <h2>{routine.name}</h2>
                                <p>{routine.goal}</p>
                                <p>{routine.creatorName}</p>
                                {/* <p>{routine.activities}</p> */}
                            </article>
                        )
                        
                    }) : <h1>No routines to display</h1>}
                </section>
                </>
                )
        }
    }
        
    
}

export default Routines;