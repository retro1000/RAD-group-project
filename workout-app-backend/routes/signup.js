const router = require('express').Router();
const UserQueries = require('../queries/user.query.js');

router.route('', '/').get((req, res) => {
    
});

router.route('', '/').post(async(req, res) => {
    try{
        const {firstname, lastname, username, age, gender, heigth, weigth, password} = req.body;
        await UserQueries.createNewUser(`${firstname} ${lastname}`, username, password, age, gender, heigth, weigth);
        res.status(201).json({ message: 'User registered successfully.' });
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({error: 'An error occured.'});
    }
});

module.exports = router;