const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
    INSERT INTO activities(name, description)
    VALUES ($1, $2)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `, [name, description]);
    return activity;
  } catch (error) {
    throw error;
  }
};

async function getAllActivities() {
  try {
    const { rows: activities } = await client.query(`
    SELECT *
    FROM activities;
    `);
    return activities;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const {rows: [activity] } = await client.query(`
    SELECT *
    FROM activities
    WHERE id=$1
    `, [id]);
    return activity
  } catch (error) {
  }
}

async function getActivityByName(name) {
  try {
    const {rows: [activity] } = await client.query(`
    SELECT *
    FROM activities
    WHERE name=$1
    `, [name]);
    return activity
  } catch (error) {
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  const keys = Object.keys(fields);
  const setStr = keys.map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  const values = Object.values(fields);

  try {
    const { rows: [activity] } = await client.query(`
    UPDATE activities
    SET ${setStr}
    WHERE id=${id}
    RETURNING *;
    `, values);
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
