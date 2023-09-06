import express from 'express';
import { UserQueries } from '../queries/user.query.js';

const router = express.Router();

router.route('/').post(async(req, res) => {
    try{
        const {firstname, lastname, username, age, gender, heigth, weigth, password} = req.body;
        const err = await UserQueries.createNewUser(`${firstname} ${lastname}`, username, password, age, gender, heigth, weigth);
        if(typeof err !== 'undefined') throw err;
        return res.status(201).json({ message: 'User registered successfully.' });
    }catch(err){
        console.log('Error:', err);
        return res.status(500).json({error: 'An error occured.'});
    }
});

export default router;