import mongoose, { Error, Mongoose } from "mongoose";
import User from "../models/exersice.model";
import { startSession } from "mongoose";
import bcrypt from 'bcrypt';

const RoleQuery = require("../queries/role.query");
const WorkoutQuery = require("../queries/workout.query");
const CommonQueries = require('../queries/common.query');

const getUserByUsername = (username) => {
    try{
        return User.findOne({username: username})
            .select('userId', 'username', 'password', 'roles')|| (()=>{throw new Error('No username found');})();
    }catch(err){
        throw err;
    }
}

const getMyWorkoutsByUserId = async(userId) => {
    try{
        return await User.findOne({userId:userId})
            .select('workouts.$.workoutId workouts.$.status workouts.$.executionTime')
            || (()=>{throw new Error('No workouts found');})();
    }catch(err){
        throw err;
    }
}

const getUserDetailsByUsername = async(username) => {
    try{
        return await User.findOne({username:username})
            .select('userId name age gender height weigth username workouts')
            || (()=>{throw new Error('No username found');})();
    }catch(err){
        throw err;
    }
}

const createNewUser = async(name, username, password, age, gender, heigth, weigth, role) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const existingIds = await Exersice.find().select('userId');
        const userId = await CommonQueries.generateUniqueExerciseId(existingIds, existingIds+1);
        const hashPassword = await bcrypt.hash(password, 10);
        const roles = RoleQuery.getRoleByName(role);
        const userDetails = new User(
            userId, name, age, gender, username, hashPassword, heigth, weigth, [], [roles]
        )
        await userDetails.save();
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally{
        await session.endSession();
    }
}

const updateWorkoutStatusByUserIdAndWorkoutId = async(userId, workoutId, status) => {
    try{
        await User.findOneAndUpdate(
            {userId:userId, 'workouts.workoutId':workoutId},
            {$set:{'workouts.$.status':status, 'workouts.$.executionTime':0}},
            {new: false}
        ) || (()=>{throw new Error('userId cannot found');})();
    }catch(err){
        throw err;
    }
}

const selectNewWorkout = async(userId, workoutId, time) => {
    try{
        User.findOneAndUpdate(
            {userId:userId},
            {$addToSet:{workouts:{'workoutId':workoutId, 'time':time, 'status':'Ongoing', 'executionTime':0}}},
            {new: false}
        ) || (()=>{throw new Error('userId not found or workout exists');})();
    }catch(err){
        throw err;
    }
}

const chooseNewWorkout = async(userId, workoutId) => {
    const session = await Mongoose.startSession();
    try{
        session.startTransaction();
        const time = await WorkoutQuery.calculateTime(workoutId);
        User.findOneAndUpdate(
            {userId:userId},
            {$addToSet:{workouts:{'workoutId':workoutId, 'time':time, 'status':'Ongoing', 'executionTime':0}}},
            {new:false}
        ) || (()=>{throw new Error('userId not found or workout exists');})();
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally{
        await session.endSession();
    }
}

const updateExecutionTimeByUserIdAndWorkoutId = async(userId, workoutId, time) => {
    try{
        User.findOneAndUpdate({userId:userId, 'workouts.workoutId':workoutId}, {$set:{'workouts.$.executionTime':time}}) || (()=>{throw new Error('No workout found');})();
    }catch(err){
        throw err;
    }
}