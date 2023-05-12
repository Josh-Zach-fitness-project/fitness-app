import React from "react";

const Activities = ({activities}) => {
    return(
    <>
        <section>
        <h1>Activities</h1>
            {activities.length ? activities.map((activity) => {
                return (
                    <article key={activity.id} id='singleActivity'>
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