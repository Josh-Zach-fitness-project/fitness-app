/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import AddActivityForm from './AddActivityForm';
import CreateRoutineForm from './CreateRoutineForm';
import DeleteRoutineButton from './DeleteRoutineButton';
import EditRoutineButton from './EditRoutineButton';

const Routines = ({allMyRoutines, setAllMyRoutines, routines, setRoutines, isLoggedIn, token, user, allActivities}) => {
    const [myRoutines, setMyRoutines] = useState(false);
    if (!isLoggedIn) {
        return(
            <>
            <div className='routine-container'>

        <div></div>
        <section>
            <h1 className='routines-title'>Public Routines</h1>
            {routines.length ? routines.map((routine) => {
                const activities = routine.activities;
                
                // console.log('$$$$$$$', routine)
                return (
                    <article key={routine.id} id='singleRoutine'>
                        <h2>{routine.name}</h2>
                        <p>{routine.goal}</p>
                        <p>{routine.creatorName}</p>
                        <article>
                            <h3>Activities for Routine</h3>
                            {activities.length ? activities.map((activity) => {
                                return(
                                    <div key={activity.id}>
                                        <p>{activity.name}</p>
                                        <p>{activity.count}</p>
                                        <p>{activity.duration}</p>
                                    </div>
                                    
                                )
                            }):  <h1>No activities to display</h1>
                            
                        }
                        </article>
                    </article>
                )
                
            }) : <h1>No routines to display</h1>}
        </section>
            </div>
        </>
        )
    } else {
        if (!myRoutines) {
            return(
                <>
                <div className='routine-container'>
                <div className='routines-title'>Workout Routines</div>
                <CreateRoutineForm allMyRoutines={allMyRoutines} setAllMyRoutines={setAllMyRoutines} token={token} user={user} routines={routines} setRoutines={setRoutines}/>
                <section
                    className='routine-toggle'
                >
                    <button
                    className='toggle-button'
                    onClick={() => {
                        setMyRoutines(true);
                    }}
                    >View My Routines</button>
                    <h1>Public Routines</h1>
                    {routines.length ? routines.map((routine) => {
                        const activities = routine.activities;
                        return (
                            <article key={routine.id} id='singleRoutine'>
                                <h2>{routine.name}</h2>
                                <p>{routine.goal}</p>
                                <p>{routine.creatorName}</p>
                                <article>
                            <h3>Activities for Routine</h3>
                            {activities.length ? activities.map((activity) => {
                                return(
                                    <div key={activity.id}>
                                        <p>{activity.name}</p>
                                        <p>{activity.count}</p>
                                        <p>{activity.duration}</p>
                                    </div>
                                    
                                )
                            }):  <h1>No activities to display</h1>
                            
                        }
                        </article>
                            </article>
                        )
                        
                    }) : <h1>No routines to display</h1>}
                </section>
                </div>
                </>
                )
        } else {
            return(
                <>
                <div className='routine-container'>

                <div className='routines-title'>My Routines</div>
                <CreateRoutineForm allMyRoutines={allMyRoutines} setAllMyRoutines={setAllMyRoutines} token={token} user={user} routines={routines} setRoutines={setRoutines}/>
                <section
                    className='routine-toggle'
                >
                    <button
                    className='toggle-button'
                    onClick={ async () => {
                        setMyRoutines(false);
                    }}
                    >View Public Routines</button>
                    {allMyRoutines.length ? allMyRoutines.map((routine) => {
                        const activities = routine.activities;
        
                        return (
                            <article key={routine.id} id='singleRoutine'>
                                <h2>{routine.name}</h2>
                                <p>{routine.goal}</p>
                                <p>{routine.creatorName}</p>
                                 <DeleteRoutineButton username={routine.creatorName} routineId={routine.id} setAllMyRoutines={setAllMyRoutines} setRoutines={setRoutines} token={token}/>
                                <AddActivityForm allActivities={allActivities} routineId={routine.id}/>
                                <article>
                            <h1>Activities for Routine</h1>
                            {activities ? activities.map((activity) => {
                                return(
                                    <div key={activity.id}>
                                        <p>{activity.name}</p>
                                        <p>{activity.count}</p>
                                        <p>{activity.duration}</p>
                                    </div>
                                    
                                )
                            }):  <h1>No activities to display</h1>
                            
                        }
                        </article>
                            </article>
                        )
                        
                    }) : <h1>No routines to display</h1>}
                </section>
                </div>
                </>
                )
        }
    }
        
    
}

export default Routines;