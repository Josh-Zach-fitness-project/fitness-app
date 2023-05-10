import React, { useState } from "react";
import { userCreatedRoutines } from "../api";

const CreateRoutineForm = ({token}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let pub
        console.log(isPublic);
        if(isPublic === "true") {
            pub = true
        } else {
            pub = false
        }
        await userCreatedRoutines({token, name, goal, pub})

        if(name) {
            setName("")
            setIsPublic("")
            setGoal("")
        }
        console.log("SUBMITTED!!!!!!")
    }

return (
<form onSubmit={handleSubmit}>Create your own Routine
    <select name="Public?" value={isPublic} onChange={(event) => setIsPublic(event.target.value)}>
        <option placeholder="Select"></option>
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