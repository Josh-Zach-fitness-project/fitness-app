const client = require("./client");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;

// database functions

const requireUser = async (req, res, next) => {

  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)){
      const token = auth.slice(prefix.length);
      
      const {id} = jwt.verify(token, JWT_SECRET);
      if (id) {
          req.user = await getUserById(id)
          console.log('YYYYYYY', req.user)
              next();
          }
  }

  if(!req.user) {
      next({
        name: 'Not loggin in',
        message: "You must be logged in to perform this action",
        error: 'Error'
      });
  }
  next();
}

// user functions
async function createUser({ username, password }) {

  const SALT_COUNT = 10;

  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, hashedPassword]);

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword);
    delete user.password;
    if (isValid) return user
    } catch (error) {
    throw error
  }
}

async function getUserById(userId) {
  try {
    const {rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1
    `, [userId]);
    delete user.password;
    return user
  } catch (error) {
  }
}

async function getUserByUsername(userName) {
  try {
    const {rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1
    `, [userName]);
    return user
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  requireUser
}
