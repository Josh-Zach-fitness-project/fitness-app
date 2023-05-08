const express = require('express');
const { getAllRoutines, requireUser } = require('../db');
const routinesRouter = express.Router();

// GET /api/routines
routinesRouter.get("/", async (req, res, next) => {
try {
    const routines = await getAllRoutines();
    res.send(routines);
    
} catch (error) {
    next(error) ;
}
});
// POST /api/routines

// PATCH /api/routines/:routineId
// routinesRouter.patch("/routines/:routineId", requireUser, async (req, res, next) => {
//     try {
//         console.log(req.body);
//     } catch (error) {
//         next(error);
//     }
// })

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = routinesRouter;
