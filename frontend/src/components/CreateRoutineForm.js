import React, { useState } from "react";
import { fetchRoutines, userCreatedRoutines } from "../api";

const CreateRoutineForm = ({token, setRoutines, user, setAllMyRoutines, allMyRoutines}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let pub;
        if(isPublic === "true") {
            pub = true
        } else {
            pub = false
        }
        const routineToAdd = await userCreatedRoutines({token, name, goal, pub});
        routineToAdd.creatorName = user.username;
        console.log('OOOOOO', routineToAdd)
        const fetchedRoutines = await fetchRoutines();
            setRoutines(fetchedRoutines);
            setAllMyRoutines([routineToAdd, ...allMyRoutines])
            setName("")
            setIsPublic("")
            setGoal("")
    }
return (
    <div className="routine-form-container">
<form 
    className="routine-form"
    onSubmit={handleSubmit}>Create your own Routine
    <select name="Public?" value={isPublic} onChange={(event) => 
        {setIsPublic(event.target.value)}} required>
        <option placeholder="Select">Select</option>
        <option value="true">Public</option>
        <option value="false">Private</option>
    </select>
    <input
    placeholder="Routine Name" value={name} onChange={(event) => setName(event.target.value)}
    >  
    </input>
    <input
    placeholder="Goal" value={goal} onChange={(event) => setGoal(event.target.value)}
    >
    </input>
    <button type="submit"
    >Submit</button>
</form>
    </div>

)
}

export default CreateRoutineForm;

{/* <form onSubmit={handleSubmit}>
            <input
            placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}
            ></input>
            <input
            placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}
            ></input>
            <button type="submit"
            
            >Submit</button>
        </form> */}