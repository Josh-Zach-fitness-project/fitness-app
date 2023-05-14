import React from "react";

const Activities = ({allActivities}) => {
    return(
    <>
        <section className='routine-container'>
        <h1 className='routines-title'>Activities</h1>
            {allActivities.length ? allActivities.map((activity) => {
                return (
                    <article key={activity.id} id='singleRoutine'>
                        <h2>{activity.name}</h2>
                        <p>{activity.description}</p>
                    </article>
                )
                
            }) : <h1>No activities to display</h1>}
        </section>
    </>
            )
            }

export default Activities;