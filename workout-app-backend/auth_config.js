import passport, { initialize } from "passport";
import expressSession from "express-session";
import {app} from "./server_config.js";
import { Strategy as localStrategy } from 'passport-local';

const UserQueries = require('./queries/user.query.js');
app.use(session({
    secret: "workout_plans_web_app",
    resave: false,
    saveUninitialized: false
}));

app.use(initialize());
app.use(_session());

passport.use(new localStrategy(username, password, done)=>{
    UserQueries.getUserByUsername(username)
});