const router = require('express').Router();
const User = require('../models/user.model');

router.route('', '/').get((req, res) => {
    res.render('http://localhost:3000/login');
});

router.route('', '/').post((req, res) => {
    
});

module.exports = router;