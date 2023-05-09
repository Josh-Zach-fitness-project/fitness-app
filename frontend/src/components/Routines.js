import React from 'react';

const Routines = ({routines}) => {
    
    return(
    <>
    <div>Routines Page</div>
    <section>
        <h1>These are the Routines</h1>
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
}

export default Routines;