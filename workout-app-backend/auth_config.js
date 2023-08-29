import passport, { initialize } from "passport";
import expressSession from "express-session";
import {app} from "./server_config.js";
import { Strategy as localStrategy } from 'passport-local';
import User from "./models/user.model.js";

app.use(session({
    secret: "workout_plans_web_app",
    resave: false,
    saveUninitialized: false
}));

app.use(initialize());
app.use(_session());

passport.use(new localStrategy(username, password, done)=>{
    User.findOne()
});