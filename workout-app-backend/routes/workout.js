import express from 'express';
import {WorkoutQueries} from '../queries/workout.query.js';
import upload from '../config/multer.config.js';

const router = express.Router();

router.route('', '/').post(async(req, res) => {
    try{
        const data = req.body;
        res.json(await WorkoutQueries.getWorkoutByRules(data.bodyPartId, data.age, data.gender, data.start, data.limit));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/view').post(async(req, res) => {
    try{
        res.json(await WorkoutQueries.getWorkoutById(req.body.workoutId));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
})

router.route('', '/create').post(upload.single('image'), (req, res) => {
    try{
        
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

export default router;