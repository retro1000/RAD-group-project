import express from 'express';
import passport from '../server_config.js';
import dotenv from 'dotenv';

dotenv.config();

const reactApp = process.env.REACT_APP || 'http://localhost:3000';

const router = express.Router();

router.route('', '/').post(passport.authenticate('local', {
    successRedirect: `${reactApp}/home`,
    failureRedirect: `${reactApp}/login`,
    failureFlash: true,
}));

export default router;