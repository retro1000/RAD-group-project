import passport, { initialize } from "passport";
import expressSession from "express-session";
import {app} from "../server_config.js";
import { Strategy as localStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

const UserQueries = require('../queries/user.query.js');

app.use(session({
    secret: "workout_plans_web_app",
    resave: false,
    saveUninitialized: false
}));

app.use(initialize());
app.use(passport.session());

passport.use(
    new localStrategy({usernameField:'username'}, (username, password, done)=>{
        const {user, err} = UserQueries.getUserByUsername(username);
        if(err) return done(err);
        if(!user) return done(null, false, {message:'Invalid creadentials'});
        if(!bcrypt.compare(password, user.password)) return done(null, false, {message:'Invalid creadentials'});
        else return done(null, user);
    })
);

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const {user, err} = UserQueries.getUserByUsername(username);
    done(err, user);
});