import express from 'express';
import {RoleQueries} from '../queries/role.query.js';

const router = express.Router();


router.route('', '/').get(async(req, res) => {
    try{
        res.json(await RoleQueries.getAllRoles());
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

module.exports = router;