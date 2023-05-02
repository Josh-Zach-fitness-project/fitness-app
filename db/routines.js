const { attachActivitiesToRoutines } = require("./activities");
const client = require("./client");

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
    const {rows: [userId] } = await client.query(`
    SELECT id
    FROM users
    WEHRE username=${username} 
    `);
    console.log('OOOOOO: ', userId)
    
    const {rows: routine } = await client.query(`
    SELECT *
    FROM routines
    WHERE "creatorId"= ${userId}
    `)
    console.log('XXXXXX: ', routine)
    return routine
  } catch (error) {
  }
}

// SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
// FROM activities
// JOIN routine_activities ON routine_activities."activityId" = activities.id
// WHERE routine_activities."routineId" IN (${position})

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {
}

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
