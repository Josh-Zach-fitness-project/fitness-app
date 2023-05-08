const APIURL = 'http://fitnesstrac-kr.herokuapp.com/api/'

export const fetchRoutines = async () => {
    try {
        const response = await fetch(`${APIURL}/routines`, {
            headers: {
            'Content-Type': 'application/json',
            }});
        const result = await response.json()
        console.log('GGGGGGG', result)
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
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}