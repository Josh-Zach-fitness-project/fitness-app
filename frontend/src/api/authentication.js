const APIURL = 'http://fitnesstrac-kr.herokuapp.com/api/'

export const authenticateUser = async (userobject) => {
    // console.log(userobject);
    try {
      const response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userobject)
      });
      
          const {success, error, data} = await response.json();
          console.log(data);
          if(success) {
            const {token, message} = data;
            localStorage.setItem('token', token);
            return {token, message};
          }
          if (!success && !error){
            const {name, message} = data;
            return {name, message};
          }
          return;
      } catch (err) {
          console.error(err);
      }
  }
  
  export const authenticateNewUser = async (userobject) => {
    try {
      const response = await fetch(`${APIURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userobject)
    });
    console.log("This is our userObject", userobject)
      
          const {success, error, data} = await response.json();
          console.log("this is data", data)
          console.log("This is success", success);
          console.log("this is error", error);
          if(success) {
            const {token, message} = data;
            localStorage.setItem('token', token);
            return {token, message};
          }
          if (!success && !error){
            const {name, message} = data;
            return {name, message};
          }
          return;
      } catch (err) {
          console.error(err);
      }
  }