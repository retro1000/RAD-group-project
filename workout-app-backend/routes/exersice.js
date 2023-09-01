import express from 'express';
import {ExersiceQueries} from '../queries/exercise.query.js';
import upload from '../config/multer.config.js';

const router = express.Router();

router.route('', '/').post(async(req, res) => {
    try{
        const data = req.body;
        res.json(await ExersiceQueries.getExersiceByRules(data.bodyPartId, data.type, data.equipment, data.difficulty, data.age, data.gender, data.start, data.limit));
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

router.route('', '/create').post(upload.single('mainImage'), upload.array('images', 5), async(req, res) => {
    try{
        const data = req.body;
        await ExersiceQueries.createNewExersice(data.name, data.type, data.equipment, data.difficulty, data.age, data.gender, data.mainImage, data.images, data.steps, data.bodyPartIds);
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

export default router;