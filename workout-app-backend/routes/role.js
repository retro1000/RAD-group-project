import express from 'express';
import {RoleQueries} from '../queries/role.query.js';
import { Middleware } from '../config/middleware.config.js';

const router = express.Router();


router.route('/').get(Middleware.ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).json(await RoleQueries.getAllRoles());
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

export default router;