import React, { useState } from "react";
import { attachRoutineActivities } from "../api";

const AddActivityForm = ({allActivities, routineId}) => {
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [chosenActivity, setChosenActivity] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const activityId = chosenActivity;
        console.log("this is our chosen activity:", chosenActivity)

        
        await attachRoutineActivities({activityId, count, duration, routineId});

        setCount("");
        setDuration("");
        setChosenActivity("");
        

    }
return (
<form onSubmit={handleSubmit}>Add Activity to Routine
    <select name="Public?" value={chosenActivity} onChange={(event) => 
        {setChosenActivity(event.target.value)}} required>
        {allActivities.length ? allActivities.map((activity) => {
            return(
                <option key={activity.id} value={activity.id}>
                    {activity.name}
                </option>
            )
        }) : <></>
        }
    </select>
    <input
    placeholder="Count" value={count} onChange={(event) => setCount(event.target.value)}
    >  
    </input>
    <input
    placeholder="Duration" value={duration} onChange={(event) => setDuration(event.target.value)}
    >
    </input>
    <button type="submit"
    >Submit</button>
</form>

)
}


export default AddActivityForm;