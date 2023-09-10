import mongoose, { Error, Mongoose } from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import {RoleQueries} from "../queries/role.query.js";
import {WorkoutQueries} from "../queries/workout.query.js";
import {CommonQueries} from '../queries/common.query.js';

const getUserByUsername = async(username) => {
    try{
        return await User.findOne({username: username})
            .select('userId username password roles') || (()=>{throw new Error('No username found');})();
    }catch(err){
        throw err;
    }
}

const getMyWorkoutsByUserId = async(userId) => {
    try{
        const list = await User.findOne({userId:userId}) || (()=>{throw new Error('No workouts found');})();
        if(!list) throw err;
        return list.workouts.map((workout) => ({
            workoutId:workout.get('workoutId'),
            name: workout.get('name'),
            status: workout.get('status'),
        }));
    }catch(err){
        throw err;
    }
}

const getMyWorkoutByIds = async(userId, id) => {
    try{
        const user = await User.findOne({userId:userId}) || (()=>{throw new Error('No workouts found');})();
        const workout = user.workouts.find((workout) => workout.get('workoutId') === parseInt(id));
        if(workout) return workout.get('exerciseList');
    }catch(err){
        throw err;
    }
}

const getUserDetailsByUsername = async(username) => {
    try{
        return await User.findOne({username:username})
            .select('userId name age username gender level email conatctNo username')
            || (()=>{throw new Error('No username found');})();
    }catch(err){
        throw err;
    }
}

const createNewUser = async(name, username, password, age, gender, email, contactNo, level, role) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const existingIds = (await User.find().select('userId')).map(Id=>Id.userId);;
        const userId = await CommonQueries.generateUniqueId(existingIds, existingIds.length+1);
        const hashPassword = await bcrypt.hash(password, 10);
        const roles = new Map();
        const roleData = await RoleQueries.getRoleByName(role);
        roles.set('roleId', roleData['roleId']);
        roles.set('name', roleData['name']);
        const userDetails = new User({
            userId:userId,
            name:name,
            age:age,
            gender:gender,
            username:username,
            password:hashPassword,
            level:level,
            email:email,
            contactNo:contactNo,
            workouts:[],
            roles: [roles]
        })
        await userDetails.save() || (()=>{throw new Error('username exist');})();
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

const chooseNewWorkout = async(userId, workoutId, name) => {
    const session = await Mongoose.startSession();
    try{
        session.startTransaction();
        const time = await WorkoutQueries.calculateTime(workoutId);
        const list = await WorkoutQueries.getWorkoutById(workoutId);
        User.findOneAndUpdate(
            {userId:userId},
            {$addToSet:{workouts:{'workoutId':workoutId, 'name':name, 'img':img, 'exerciseList':list.exercises, 'time':time, 'status':'Ongoing', 'executionTime':0}}},
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

const followWorkout = async(userId, workoutId, status) => {
    try{
        if(status === 'Completed'){
            await User.findOneAndUpdate(
                {userId: userId, 'workouts.workoutId': workoutId},
                {$set: {'workouts.$.status':'Ongoing', 'workouts.$.executionTime':0}}
            ) || (()=>{throw new Error('No workout found');})();
        }
        return await WorkoutQueries.getWorkoutById(workoutId);
    }catch(err){
        throw err;
    }
}

export const UserQueries = {getMyWorkoutByIds, followWorkout, getUserByUsername, getMyWorkoutsByUserId, getUserDetailsByUsername, updateWorkoutStatusByUserIdAndWorkoutId, selectNewWorkout, createNewUser, updateExecutionTimeByUserIdAndWorkoutId, chooseNewWorkout};