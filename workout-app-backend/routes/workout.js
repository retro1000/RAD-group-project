import express from 'express';
import {WorkoutQueries} from '../queries/workout.query.js';
import upload from '../config/multer.config.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();

router.route('/').post(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        const data = req.body;
        return res.status(200).json({dataList: await WorkoutQueries.getWorkoutByRules([data.bodyPartId], data.sortOptions[0].val, data.sortOptions[1].val)});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/sort_key').post(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json({sortList: await WorkoutQueries.getExersiceSortKeys(req.body.bodyPartId)});
    }catch(err){
        return res.status(500).json({massage: 'Internal server error'});
    }
});

router.route('/view').post(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json(await WorkoutQueries.getWorkoutById(req.body.workoutId));
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
})

export default router;