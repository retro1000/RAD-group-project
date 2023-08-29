const router = require('express').Router();
const ExersiceQueries = require('../queries/exersice.query.js');

router.route('', '/').post(async(req, res) => {
    try{
        const data = req.body;
        res.json(await ExersiceQueries.getExersiceByRules(data.age, data.gender, data.start, data.limit));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

router.route('', '/view').post(async(req, res) => {
    try{
        res.json(await ExersiceQueries.getExersiceById(req.body.exersiceId));
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
})

module.exports = router;