const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [routine_activity] } = await client.query(`
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [routineId, activityId, count, duration]);
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const {rows: [routine_activity] } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE id=$1
    `, [id]);
    return routine_activity
  } catch (error) {
    throw error
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const {rows: routine_activity } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE "routineId"=$1
    `, [id]);
    return routine_activity
  } catch (error) {
    throw error
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  const keys = Object.keys(fields);
  const setStr = keys.map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  const values = Object.values(fields);

  try {
    const { rows: [routine_activity] } = await client.query(`
    UPDATE routine_activities
    SET ${setStr}
    WHERE id=${id}
    RETURNING *;
    `, values);
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {rows: [routAct]} = await client.query(`
    DELETE FROM routine_activities 
    WHERE id=$1
    RETURNING *
    `, [id])
    return routAct
  } catch (error) {
    throw error
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const routActToEdit = await getRoutineActivityById(routineActivityId)
    const {rows: [routine]} = await client.query(`
    SELECT *
    FROM routines
    WHERE id=${routActToEdit.routineId}
    `)
    console.log('AAAA', userId)
    console.log('BBBBB', routine)
    if(userId === routine.creatorId) {
      return true
    } else return false
  } catch (error) {
    throw error
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
