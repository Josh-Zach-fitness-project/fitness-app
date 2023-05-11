import React, { useState } from 'react';
import CreateRoutineForm from './CreateRoutineForm';

const Routines = ({routines, setRoutines, isLoggedIn, token, filteredRoutines}) => {
    const [myRoutines, setMyRoutines] = useState(false)
    
    if (!isLoggedIn) {
        return(
        <>
        <div>Routines Page</div>
        <section>
            <h1>These are the Public Routines</h1>
            {routines.length ? routines.map((routine) => {
                // const {activities} = routine.activities;
                return (
                    <article key={routine.id} id='singleRoutine'>
                        <h2>{routine.name}</h2>
                        <p>{routine.goal}</p>
                        <p>{routine.creatorName}</p>
                        <p>{routine.activities[0].name}</p>
                        {/* <article>
                            <h3>Activities for Routine</h3>
                            {activities.length ? activities.map((activity) => {
                                return(
                                    <div key={activity.id}>
                                        <p>{activity.name}</p>
                                        <p>{activity.count}</p>
                                        <p>{activity.duration}</p>
                                    </div>
                                    
                                )
                            }:  <h1>No routines to display</h1>}
                            )}

                        </article> */}
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
                <CreateRoutineForm token={token} routines={routines} setRoutines={setRoutines}/>
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
                <CreateRoutineForm token={token} routines={routines} setRoutines={setRoutines}/>
                <section>
                    <button
                    onClick={() => {
                        setMyRoutines(false);
                    }}
                    >View Public Routines</button>
                    <h1>These are my Routines</h1>
                    {filteredRoutines.length ? filteredRoutines.map((routine) => {
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