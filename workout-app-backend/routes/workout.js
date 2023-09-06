import express from 'express';
import {WorkoutQueries} from '../queries/workout.query.js';
import upload from '../config/multer.config.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();

router.route('/').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['admin', 'users']), async(req, res) => {
    try{
        const data = req.body;
        return res.status(200).json(await WorkoutQueries.getWorkoutByRules(data.bodyPartId, data.age, data.gender, data.start, data.limit));
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/view').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['admin', 'users']), async(req, res) => {
    try{
        return res.status(200).json(await WorkoutQueries.getWorkoutById(req.body.workoutId));
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
})

router.route('/create').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['admin']), upload.single('image'), (req, res) => {
    try{
        
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

export default router;