const router = require('express').Router();
const BodyPartQueries = require('../queries/bodyPart.query.js');

router.route('', '/').get(async(req, res) => {
    try{
        res.json(await BodyPartQueries.getAllBodyParts());
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

module.exports = router;