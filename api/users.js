/* eslint-disable no-useless-catch */
const express = require("express");
const { getUserByUsername, createUser, getUser, requireUser, getAllRoutinesByUser } = require("../db");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const _user = await getUserByUsername(username);
        // if (_user) {
        //     next({
        //         name: "UserExistsError",
        //         message: "A user by that username already exists"
        //     });
        // }

        // if (password.length < 8) {
        //     next({
        //         name: "InvalidPasswordError",
        //         message: "Password must be at least 8 characters"
        //     });
        // }    

        const user = await createUser({username, password});
        
        const token = jwt.sign({
            username: user.username,
            password: user.password
        }, process.env.JWT_SECRET, {
            expiresIn: "2w"
        })
        
        console.log('KKKKKKKK', token)

        res.send({
            message: "thank you for registering",
            token: token,
            user: user
        });
    } catch (error) {
        next(error);
    }
});
// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const user = await getUser(username, password);

        if (!username || !password) {
            next({
              name: "MissingCredentialsError",
              message: "Please supply both a username and password"
            });
          }

        const token = jwt.veryify(user, process.env.JWT_SECRET);

        res.send({
        message: "You are logged in",
        token: token
        })
    } catch (error) {
        next(error);
    }
});
// GET /api/users/me
usersRouter.get("/me", requireUser, async (req, res, next) => {
    const {username} = user.body;
    try {
        const data = await getAllRoutinesByUser(username)
        res.send(data)
    } catch (error) {
        next(error)
    }
})

// GET /api/users/:username/routines

module.exports = usersRouter;
