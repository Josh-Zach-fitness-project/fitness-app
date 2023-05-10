import React, { useState } from "react";
import { userCreatedRoutines } from "../api";

const CreateRoutineForm = ({token}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let pub;
        if(isPublic === "true") {
            console.log('is public true', isPublic);
            pub = true
        } else {
            console.log('is public false', isPublic);
            pub = false
        }
        await userCreatedRoutines({token, name, goal, pub})

        if(token) {
            setName("")
            setIsPublic("")
            setGoal("")
        }
        console.log("SUBMITTED!!!!!!")
    }
console.log('&&&&&&', typeof isPublic)
return (
<form onSubmit={handleSubmit}>Create your own Routine
    <select name="Public?" value={isPublic} onChange={(event) => 
        {
            console.log(event.target.value)
            setIsPublic(event.target.value)}} required>
    {/* <select name="Public?" value={isPublic} onChange={(event) => setIsPublic(event.target.value)} required> */}
        <option disabled="disabled" selected="selected">Select an option.</option>
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