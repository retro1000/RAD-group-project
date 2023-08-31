const router = require('express').Router();
const WorkoutQueries = require('../queries/exersice.query.js');

router.route('', '/').post(async(req, res) => {
    try{
        const data = req.body;
        res.json(await WorkoutQueries.getWorkoutByRules(data.age, data.gender, data.start, data.limit));
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

module.exports = router;