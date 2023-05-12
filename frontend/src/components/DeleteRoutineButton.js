import React from "react";

import { deleteRoutine, fetchRoutines, getMyRoutines } from "../api";

const DeleteRoutineButton = ({routineId, token, setAllMyRoutines, setRoutines, username}) => {
    
    const handleSubmit = async () => {
        console.log('FFFFFF', token)
        await deleteRoutine({routineId, token});
        const fetchedRoutines = await fetchRoutines();
                setRoutines(fetchedRoutines);
        const allMyFetchedRoutines = await getMyRoutines(username);
                setAllMyRoutines(allMyFetchedRoutines);
    }
    return(
        <>
        <button onClick={handleSubmit}>Delete Routine</button>
        </>
    )
}

export default DeleteRoutineButton;