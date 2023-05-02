const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
    INSERT INTO activities(name, description)
    VALUES ($1, $2)
    RETURNING *;
    `, [name, description]);
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  const { rows: activity } = await client.query(`
  SELECT *
  FROM activities;
  `)
  console.log('GGGGG: ', activity);
const activities = await Promise.all(activity.map(act => get))
  return activities
}

// NEED TO FINISH THE PROMISE MAPPING, SEE EXAMPLE BELOW

// const { rows: postIds } = await client.query(
//   `SELECT * 
//   FROM posts;
//   `);
// const posts = await Promise.all(postIds.map(post => getPostById(post.id)))

// return posts;

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

async function getActivityByName(name) {}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
