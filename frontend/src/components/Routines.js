import React, { useState } from 'react';
import AddActivityForm from './AddActivityForm';
import CreateRoutineForm from './CreateRoutineForm';
import DeleteRoutineButton from './DeleteRoutineButton';
import EditRoutineButton from './EditRoutineButton';

const Routines = ({routines, setRoutines, isLoggedIn, token, user, filteredRoutines, allActivities}) => {
    const [myRoutines, setMyRoutines] = useState(false)
    
    if (!isLoggedIn) {
        return(
            <>
        <div>Routines Page</div>
        <section>
            <h1>These are the Public Routines</h1>
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
        </>
        )
    } else {
        if (!myRoutines) {
            return(
                <>
                <div>Routines Page</div>
                <CreateRoutineForm token={token} user={user} routines={routines} setRoutines={setRoutines}/>
                <section>
                    <button
                    onClick={() => {
                        setMyRoutines(true);
                    }}
                    >View My Routines</button>
                    <h1>These are the Public Routines</h1>
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
                </>
                )
        } else {
            return(
                <>
                <div>My Routines Page</div>
                <CreateRoutineForm token={token} user={user} routines={routines} setRoutines={setRoutines}/>
                <section>
                    <button
                    onClick={() => {
                        setMyRoutines(false);
                    }}
                    >View Public Routines</button>
                    <h1>These are my Routines</h1>
                    {filteredRoutines.length ? filteredRoutines.map((routine) => {
                        const activities = routine.activities;
                        return (
                            <article key={routine.id} id='singleRoutine'>
                                <h2>{routine.name}</h2>
                                <p>{routine.goal}</p>
                                <p>{routine.creatorName}</p>
                                <DeleteRoutineButton />
                                <EditRoutineButton />
                                <AddActivityForm allActivities={allActivities}/>
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
                </>
                )
        }
    }
        
    
}

export default Routines;