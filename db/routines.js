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

async function getRoutinesWithoutActivities() {}


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
  console.log(id);
  try {
    const { rows } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId"= users.id
    `);
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
//     const routines =  await Promise.all(rows.map(routine => { 
//        const returnedRoutine = getRoutineById(routine.routineId)
//       })) 

//     console.log("This is routines", routines)
//     console.log("!!!!!!!", rows);
//     return routines;
//   } catch (error) {
//     throw error;
//   }
// }

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

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
