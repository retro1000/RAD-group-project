//1234 - Damitha ps

import passport from "passport";
import expressSession from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
// import fs from 'fs';
import dotenv from 'dotenv';
// import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signup.js';
import bodyPartRoutes from './routes/body_part.js';
import exersiceRoutes from './routes/exersice.js';
import roleRoutes from './routes/role.js';
import workoutRoutes from './routes/workout.js';
import { UserQueries } from "./queries/user.query.js";
import userRoutes from './routes/users.js';
import bcrypt from 'bcrypt';
import flash from 'express-flash';

dotenv.config();

const connection = mongoose.connection;

const port = process.env.PORT || 5000;
const reactApp = process.env.REACT_APP || 'http://localhost:3000';
const corsObject = {
    origin: `${reactApp}`,
    methods: 'GET, POST',
    credentials: true,
};

const app = express();

app.use(cors(corsObject));
app.use(express.json());
app.use(cookieParser());

app.use(expressSession({
    secret: "workout_plans_web_app",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1 * 24 * 60 * 60 * 1000 },
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(async(username, password, done)=>{
        try{
            const user = await UserQueries.getUserByUsername(username);
            if(!user) return done(null, false);
            if(!await bcrypt.compare(password, user.password)) return done(null, false);
            else return done(null, user);
        }catch(err){
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    try{
        done(null, user.username);
    }catch(err){
        done(err);
    }
});

passport.deserializeUser(async(username, done) => {
    try{
        const user = await UserQueries.getUserByUsername(username);
        return done(null, user);
    }catch(err){
        return done(err);
    }
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true});

connection.once('open', () => {
    console.log('Database connected successfully');
});

app.post('/login', (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        try{
            if(err || !user) return res.status(403).json({ message: 'Authentication fail'});
            req.login(user, (loginErr) => {
                if(loginErr) return res.status(500).json({ message: 'Internal server error'});
                if(req.body.remember_me) req.session.cookie.maxAge = 7*24*60*60*1000;
                return res.status(200).json({ 
                    message: 'Authentication successful', 
                    username: user.username, 
                    roles:user.roles 
                });
            });
        }catch(err){
            return res.status(403).json({ message: 'Authentication fail'});
        }
    })
(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    return res.status(200).json({message:'Logout!!!'});
});

// app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/bodyParts', bodyPartRoutes);
app.use('/exercises', exersiceRoutes);
app.use('/role', roleRoutes);
app.use('/workouts', workoutRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// export default {passport, localStrategy, express};

// async function j(){
//     const k = await ExersiceQueries.getExersiceSortKeys(1);
//     console.log(k);
// }

// j();