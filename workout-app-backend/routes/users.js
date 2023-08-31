import {reactPort} from '../server_config.js';

import express from 'express';
import {UserQueries} from '../queries/user.query.js';

const router = express.Router();

router.route('', '/').get((req, res) => {
    
});

router.route('', '/').post((req, res) => {
    
});

module.exports = router;