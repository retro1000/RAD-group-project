import {reactPort} from '../server_config.js';

const router = require('express').Router();
const User = require('../models/user.model');

router.route('', '/').get((req, res) => {
    res.render(`http://localhost:${reactPort}/login`);
});

router.route('', '/').post((req, res) => {
    
});

module.exports = router;