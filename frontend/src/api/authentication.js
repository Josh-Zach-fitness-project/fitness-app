const APIURL = 'http://fitnesstrac-kr.herokuapp.com/api'

export const authenticateUser = async ({username, password}) => {
  try {
  const response = await fetch(`${APIURL}/users/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  console.log("RESPONSE", response)
  
      const result = await response.json();
      console.log(result);
      const {user, message, token}  = result;
      if(token) {
        localStorage.setItem('token', token);
        return {user, token, message};
      }
      if (!token){
        return {message};
      }
      return;
      } catch (err) {
          console.error(err);
      }
  }
  
  export const authenticateNewUser = async ({username, password}) => {
    try {
      const response = await fetch(`${APIURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      });
      console.log("RESPONSE", response)
      
          const result = await response.json();
          console.log(result);
          const {user, message, token}  = result;
          if(token) {
            localStorage.setItem('token', token);
            return {user, token, message};
          }
          if (!token){
            return {message};
          }
          return;
      } catch (err) {
          console.error(err);
      }
  }

  export const getMe = async (token) => {
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