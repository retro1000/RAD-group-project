import express from 'express';
import {ExersiceQueries} from '../queries/exercise.query.js';
import upload from '../config/multer.config.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();

router.route('/').post(async(req, res) => {
    try{
        const data = req.body;
        return res.status(200).json({dataList: await ExersiceQueries.getExersiceByRules([data.bodyPartId], data.sortOptions[0].val, data.sortOptions[1].val, data.sortOptions[2].val)});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

router.route('/sort_key').post(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json({sortList: await ExersiceQueries.getExersiceSortKeys(req.body.bodyPartId)});
    }catch(err){
        return res.status(500).json({massage: 'Internal server error'});
    }
});

router.route('/view').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['admin', 'users']), async(req, res) => {
    try{
        return res.status(200).json(await ExersiceQueries.getExersiceById(req.body.exersiceId));
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
})

// router.route('/create').post(Middleware.ensureAuthenticated, Middleware.requireRoleCheck(['admin']), upload.single('mainImage'), upload.array('images', 5), async(req, res) => {
//     try{
//         const data = req.body;
//         if(!await ExersiceQueries.createNewExersice(data.name, data.type, data.equipment, data.difficulty, data.age, data.gender, data.mainImage, data.images, data.steps, data.bodyPartIds)) return res.status(200).json({message: "Exercise succefully added"});
//     }catch(err){
//         console.log('Error:', err);
//         return res.status(500).json({error: 'An error occured.'});
//     }
// });

export default router;