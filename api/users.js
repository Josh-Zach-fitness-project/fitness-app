/* eslint-disable no-useless-catch */
const express = require("express");
const { getUserByUsername, createUser, getUser } = require("../db");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists"
            });
        }

        if (password.length < 8) {
            next({
                name: "InvalidPasswordError",
                message: "Password must be at least 8 characters"
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
            token: token
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

        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.send({
            user
        })
    } catch (error) {
        next(error);
    }
});
// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;
