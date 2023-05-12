const APIURL = 'http://fitnesstrac-kr.herokuapp.com/api'

export const fetchRoutines = async () => {
    try {
        const response = await fetch(`${APIURL}/routines`, {
            headers: {
            'Content-Type': 'application/json',
            }});
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const fetchActivities = async () => {
    try {
        const response = await fetch(`${APIURL}/activities`, {
            headers: {
            'Content-Type': 'application/json',
            }});
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const fetchUser = async (token) => {
    try {
        const response = await fetch(`${APIURL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        return result
      } catch (err) {
        console.error(err);
      }
}

export const userCreatedRoutines = async ({token, name, goal, pub}) => {
    try {
      const response = await fetch(`${APIURL}/routines`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: pub
        })
      });
      const result = await response.json();
    //   console.log('EEEEEEEEE', result)
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const attachRoutineActivities = async ({activityId, count, duration}) => {
    try {
      const response = await fetch(`${APIURL}/routines/:routineId/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count, 
          duration: duration
        })
      });
    //   console.log("api response", response);
      const result = await response.json();
      console.log("attachRoutineActivities Result:", result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

