import express from 'express';
import {BodyPartQueries} from '../queries/bodyPart.query.js';

const router = express.Router();

router.route('', '/').get(async(req, res) => {
    try{
        res.json(await BodyPartQueries.getAllBodyParts());
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

export default router;