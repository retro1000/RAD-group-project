import express from 'express';
import {ExersiceQueries} from '../queries/exercise.query.js';
import upload from '../config/multer.config.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();

router.route('/').post(Middleware.ensureAuthenticated, async(req, res) => {
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

router.route('/view').post(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json({details: await ExersiceQueries.getExersiceById(req.body.id)});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
})

router.route('/getByIds').post(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json({details: await ExersiceQueries.getExersiceByIds(req.body.ids)});
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
})

export default router;