const express = require('express');
const { getAllActivities, getPublicRoutinesByActivity } = require('../db');
const activitiesRouter = express.Router();

// GET /api/activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
    try {
        const {activityId} = req.params;
        const routines = await getPublicRoutinesByActivity({id: activityId});
        res.send(routines);
    } catch (error) {

        next(error)
    }
})
// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
    try {
            const activities = await getAllActivities()
            res.send(activities)
    } catch (error) {
        next(error)
    }
})
// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;
