import {reactPort} from '../server_config.js';
import express from 'express';
import {UserQueries} from '../queries/user.query.js';
import { WorkoutQuery } from '../queries/workout.query.js';

const router = express.Router();

router.route('', '/my-workouts').post(async(req, res) => {
    try{
        const userId = req.userId;
        res.json(await UserQueries.getMyWorkoutsByUserId(userId));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/follow-workout').post(async(req, res) => {
    try{
        const {userId, workoutId, status} = req.body;
        res.json(await UserQueries.followWorkout(userId, workoutId, status));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/finish-workout').post(async(req, res) => {
    try{
        const {userId, workoutId, period, executionTime} = req.body;
        if(period === executionTime){
            await UserQueries.updateWorkoutStatusByUserIdAndWorkoutId(userId, workoutId, 'Completed');
            res.status(201).json({des: 'Workout completed'});
        }else{
            await UserQueries.updateExecutionTimeByUserIdAndWorkoutId(userId, workoutId, executionTime);
            res.status(201).json({des: 'Updated'});
        }
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/change-status').post(async(req, res) => {
    try{
        const {userId, workoutId, status} = req.body;
        await UserQueries.updateWorkoutStatusByUserIdAndWorkoutId(userId, workoutId, (status === 'Ongoing'?'Completed':'Ongoing'));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/select-workout').post(async(req, res) => {
    try{
        const {userId, workoutId} = req.body;
        await UserQueries.chooseNewWorkout(userId, workoutId);
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/create-custom-workout').post(async(req, res) => {
    try{
        const {userId, bodyPartId, workoutData} = req.body;
        await WorkoutQuery.createNewWorkoutForUser(bodyPartId, userId, workoutData);
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

export default router;