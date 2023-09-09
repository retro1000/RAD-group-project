import express from 'express';
import { UserQueries } from '../queries/user.query.js';

const router = express.Router();

router.route('/').post(async(req, res) => {
    try{
        const {firstName, lastName, username, age, gender, email, contactNo, level, password} = req.body;
        const user = await UserQueries.createNewUser(`${firstName} ${lastName}`, username, password, age, gender, email, contactNo, level, 'users');
        if(typeof err !== 'undefined') throw err;
        return res.status(201).json({ message: 'User registered successfully.' });
    }catch(err){
        return res.status(500).json({error: 'An error occured.'});
    }
});

export default router;