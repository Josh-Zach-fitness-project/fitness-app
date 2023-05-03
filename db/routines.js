const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require("./users")
const client = require("./client");
const { addActivityToRoutine } = require("./routine_activities");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const { rows: [routine] } = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `, [creatorId, isPublic, name, goal]);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const {rows: [routine] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1
    `, [id]);
    return routine
  } catch (error) {
  }
}

async function getRoutinesWithoutActivities() {
  // try {
  //   const routines = await getAllRoutines();
  //   const updatedRoutines = await attachActivitiesToRoutines(routines);
  //   const finalRoutines = updatedRoutines.filter(routine => {
  //       if(!routine.acticvites)
  //       return finalRoutines
  //   })
  //   console.log(finalRoutines)
  // } catch (error) {
  //   throw error
  // }
}


async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(
      `
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON routines."creatorId" = users.id
    `
    );
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const routines = await getAllRoutines();
    const publicRoutines = [];
    for (let i = 0; i < routines.length; i++){
      if(routines[i].isPublic) {
        publicRoutines.push(routines[i]);
      }
    }
      return publicRoutines
    }
    
   catch (error) {
   throw (error)
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const user = await getUserByUsername(username)
   
    const routinesToReturn = await getAllRoutines();
    const theRoutines = routinesToReturn.filter(routine => routine.creatorId === user.id);
    return theRoutines;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const user = await getUserByUsername(username)
    
    const routinesToReturn = await getAllRoutines();
    const theRoutines = routinesToReturn.filter(routine => routine.creatorId === user.id && routine.isPublic);
    return theRoutines;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId"= users.id
    JOIN routine_activities ON routines.id= routine_activities."routineId"
    WHERE routines."isPublic" = true AND routine_activities."activityId"=$1;
    `,[id]);
    const updatedRoutines = await attachActivitiesToRoutines(rows);
    return updatedRoutines
  } catch (error) {
    throw error;
  }
}
// async function getPublicRoutinesByActivity({ id }) {
//   console.log(id);
//   try {
//     const { rows } = await client.query(`
//     SELECT * FROM routine_activities
//     WHERE "activityId"= ${id}
//     `);

//     const returnRoutine = async (id) => {
//       return await getRoutineById(id);
       
//     }

//     const routines =  await Promise.all(rows.map(routine => { 
//       return returnRoutine(routine.routineId)
//       })) 

//     console.log("This is routines", routines)
//     console.log("!!!!!!!", rows);
//     return routines;
//   } catch (error) {
//     throw error;
//   }
// }

async function updateRoutine({ id, ...fields }) {
  const keys = Object.keys(fields);
  const setStr = keys.map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  const values = Object.values(fields);

  try {
    const { rows: [routine] } = await client.query(`
    UPDATE routines
    SET ${setStr}
    WHERE id=${id}
    RETURNING *;
    `, values);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    await client.query(`
    DELETE FROM routine_activities 
    WHERE "routineId"=$1
    `, [id])
    const {rows: routine} = await client.query(`
    DELETE FROM routines
    WHERE id=$1
    returning *
    `, [id])
    return routine
  } catch (error) {
    throw error
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
