import express from 'express';
import {UserQueries} from '../queries/user.query.js';
import { WorkoutQueries } from '../queries/workout.query.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();

router.route('/view').get(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json({details: await UserQueries.getUserDetailsByUsername(req.user.username)});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/my-workouts').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['admin', 'users']), async(req, res) => {
    try{
        const userId = req.body.userId;
        return res.status(200).json(await UserQueries.getMyWorkoutsByUserId(userId));
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/follow-workout').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['users']), async(req, res) => {
    try{
        const {userId, workoutId, status} = req.body;
        return res.status(200).json(await UserQueries.followWorkout(userId, workoutId, status));
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/finish-workout').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['users']), async(req, res) => {
    try{
        const {userId, workoutId, period, executionTime} = req.body;
        if(period === executionTime){
            if(typeof await UserQueries.updateWorkoutStatusByUserIdAndWorkoutId(userId, workoutId, 'Completed') !== 'undefined') throw err;
            return res.status(201).json({des: 'Workout completed'});
        }else{
            if(typeof await UserQueries.updateExecutionTimeByUserIdAndWorkoutId(userId, workoutId, executionTime) !== 'undefined') throw err;
            return res.status(201).json({des: 'Updated'});
        }
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/change-status').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['users']), async(req, res) => {
    try{
        const {userId, workoutId, status} = req.body;
        if(typeof await UserQueries.updateWorkoutStatusByUserIdAndWorkoutId(userId, workoutId, (status === 'Ongoing'?'Completed':'Ongoing')) !== 'undefined') throw err;
        return res.status(201).json({des: 'Updated'});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/select-workout').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['users']), async(req, res) => {
    try{
        const {userId, workoutId} = req.body;
        if(typeof await UserQueries.chooseNewWorkout(userId, workoutId) !== 'undefined') throw err;
        return res.status(201).json({des: 'Updated'});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/create-custom-workout').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['users']), async(req, res) => {
    try{
        const {userId, bodyPartId, workoutData} = req.body;
        if(typeof await WorkoutQuery.createNewWorkoutForUser(bodyPartId, userId, workoutData) !== 'undefined') throw err;
        return res.status(201).json({des: 'Updated'});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

export default router;