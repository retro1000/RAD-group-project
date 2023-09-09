import Workout from "../models/workout.model.js";
import { Mongoose, startSession } from "mongoose";
import dotenv from 'dotenv';
import {BodyPartQueries} from '../queries/bodyPart.query.js';
import {UserQueries} from '../queries/user.query.js';
import {CommonQueries} from '../queries/common.query.js';


dotenv.config();

const getWorkoutByRules = async(bodyParts, difficulties, types) => {
    try{
        const combinations = [];
        const filter = {$or: [] };
        for(const bodyPartIds of bodyParts) for(const type of types) for(const difficulty of difficulties) combinations.push({type, difficulty, bodyPartIds});
        for (const combo in combinations) filter.$or.push({type:combinations[combo].type, difficulty:combinations[combo].difficulty, bodyPartIds:combinations[combo].bodyPartIds});
        return await Workout.find(filter).select('workoutId name img') || (()=>{throw new Error('No workout found');})();
    }catch(err){
        throw err;
    }
}

const getWorkoutSortKeys = async(bodyPartId) => {
    try{
        var list = {difficulty:[], type:[]};
        const values = await Workout.find({bodyPartIds:{$in: bodyPartId}}).select('difficulty type') || (()=>{throw new Error('No exercise found');})();
        for(const itm in values){
            const{difficulty, type} = values[itm];
            list.difficulty.push(difficulty);
            list.type.push(type);
        }
        for(const key in list) list[key]=[...(new Set(list[key]))];
        return [{name:'Difficulty', val:list.difficulty}, {name:'Type', val:list.type}];
    }catch(err){
        throw err;
    }
}

const getWorkoutById = async(workoutId) => {
    try{
        return await Workout.findOne({workoutId: workoutId}) || (()=>{throw new Error('No workoutId found');})();
    }catch(err){
        throw err;
    }
}

const createNewWorkoutForUser = async(bodyPartId, userId, workoutData) => {
    const session = await Mongoose.startSession();
    try{
        session.startTransaction();
        const existingIds = (await Workout.find().select('workoutId')).map(Id=>Id.workoutId);
        const workoutId = await CommonQueries.generateUniqueId(existingIds, existingIds.lenght+1);
        const workoutDetails = new Workout({
            workoutId:workoutId,
            name:workoutData.name,
            type:workoutData.type,
            difficulty:workoutData.difficulty,
            period:process.env.WORKOUT_DURATION,
            bodyPartId:bodyPartId,
            exercises:workoutData.exersiceList
        });
        // await BodyPartQueries.updateWorkoutList(bodyPartId, workoutId);
        const time = await calculateTime(workoutId);
        await UserQueries.selectNewWorkout(userId, workoutId, time);
        workoutDetails.save();
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally{
        await session.endSession();
    }
}

// const createNewWorkout = async(bodyPartId, workoutData) => {
//     const session = await Mongoose.startSession();
//     try{
//         session.startSession();
//         const existingIds = (await Workout.find().select('workoutId')).map(Id=>Id.workoutId);
//         const workoutId = await CommonQueries.generateUniqueId(existingIds, existingIds.lenght+1);
//         const workoutDetails = new Workout({
//             workoutId:workoutId,
//             name:workoutData.name,
//             age:workoutData.age,
//             gender:workoutData.gender,
//             period:process.env.WORKOUT_DURATION,
//             bodyPartId:bodyPartId,
//             exercises:workoutData.exersiceList
//         });
//         workoutDetails.save();
//         await BodyPartQueries.updateWorkoutList(bodyPartId, workoutId);
//         await session.commitTransaction();
//     }catch(err){
//         await session.abortTransaction();
//         throw err;
//     }finally{
//         await session.endSession();
//     }
// }

const calculateTime = async(workoutId) => {
    try{
        const exersices = (await Workout.findById({workoutId:workoutId}).select('exercises.$.time')).map(item=>item.time) || (()=>{throw new Error('WorkoutId cannot found');})();
        return (exersices.lenght-1)*process.env.BREAK_TIME + exersices.reduce((totalReps, current)=>{return totalReps+current.reps},0)*process.env.EXERSICE_SINGLE_REP_TIME;
    }catch(err){
        throw err;
    }
}

export const WorkoutQueries = {getWorkoutSortKeys, calculateTime, createNewWorkoutForUser, getWorkoutById, getWorkoutByRules};