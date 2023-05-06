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
        if (_user) {
            next({
                error:"Error",
                name: "UserExistsError",
                message: `User ${username} is already taken.`
            });
        }

        if (password.length < 8) {
            next({
                error: "Error",
                name: "Password Too Short!",
                message: "Password Too Short!"
            });
        }    

        const user = await createUser({username, password});
        
        const token = jwt.sign({
            username: user.username,
            password: user.password
        }, process.env.JWT_SECRET, {
            expiresIn: "2w"
        })

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
    if (!username || !password) {
        next({
            error: "Error",  
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    } 
    try {
        const user = await getUserByUsername(username);
        
        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.send({
                
                message: "you're logged in!",
                user,
                token
            });
    } catch (error) {
        next(error);
    }
});
// GET /api/users/me
usersRouter.get("/me", async (req, res, next) => {
    console.log('PPPPPPP', req.user)
    const {username, password} = req.user;
    try {
        const user = await getUser({username, password})
        res.send(user)
    } catch (error) {
        next(error)
    }
})

// GET /api/users/:username/routines

module.exports = usersRouter;
