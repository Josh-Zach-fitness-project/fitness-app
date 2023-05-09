const APIURL = 'http://fitnesstrac-kr.herokuapp.com/api/'

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