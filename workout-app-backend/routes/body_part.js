import express from 'express';
import {BodyPartQueries} from '../queries/bodyPart.query.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();

router.route('/').get(async(req, res) => {
    try{
        console.log('hit');
        return res.status(200).json(await BodyPartQueries.getAllBodyParts());
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

export default router;