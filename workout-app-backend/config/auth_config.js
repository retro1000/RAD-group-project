// import passport from "../server_config.js";
// import localStrategy from '../server_config.js';
// import bcrypt from 'bcrypt';
// import {UserQueries} from '../queries/user.query.js';

// passport.use(
//     new localStrategy({usernameField:'username', passwordField:'password'}, async(username, password, done)=>{
//         try{
//             const {user, err} = await UserQueries.getUserByUsername(username);
//             if(err) return done(err);
//             if(!user) return done(null, false, {message:'Invalid creadentials'});
//             if(!await bcrypt.compare(password, user.password)) return done(null, false, {message:'Invalid creadentials'});
//             else return done(null, user);
//         }catch(err){
//             return done(err);
//         }
//     })
// );

// passport.serializeUser((user, done) => {
//     try{
//         done(null, user.username);
//     }catch(err){
//         done(err);
//     }
// });

// passport.deserializeUser(async(username, done) => {
//     try{
//         const {user, err} = await UserQueries.getUserByUsername(username);
//         done(err, user);
//     }catch(err){
//         done(err);
//     }
// });
