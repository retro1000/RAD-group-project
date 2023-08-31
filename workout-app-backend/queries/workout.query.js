import Workout from "../models/workout.model";
import { Mongoose, startSession } from "mongoose";

const BodyPartQueries = require('../queries/bodyPart.query');
const UserQueries = require('../queries/user.query');
const CommonQueries = require('../queries/common.query');


require('dotenv').config();

const getWorkoutByRules = async(bodyPartIds, age, gender, start, limit) => {
    try{
        return await Workout.find($and[{age:age}, {gender:gender}, {bodyPartIds:{$in: bodyPartIds}}])
            .select('workoutId name img')
            .skip(start)
            .limit(limit) || (()=>{throw new Error('No workout found');})();
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
        const existingIds = await Exersice.find().select('userId');
        const workoutId = await CommonQueries.generateUniqueExerciseId(existingIds, existingIds+1);
        const workoutDetails = new Workout(
            workoutId, workoutData.name, workoutData.age, workoutData.gender, process.env.WORKOUT_DURATION, workoutData.exersiceList
        );
        await BodyPartQueries.updateWorkoutList(bodyPartId, workoutId);
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

const createNewWorkout = async(bodyPartId, workoutData) => {
    const session = await Mongoose.startSession();
    try{
        session.startSession();
        const existingIds = await Exersice.find().select('userId');
        const workoutId = await CommonQueries.generateUniqueExerciseId(existingIds, existingIds+1);        const workoutDetails = new Workout(
            workoutId, workoutData.name, workoutData.age, workoutData.gender, process.env.WORKOUT_DURATION, workoutData.exersiceList
        );
        await BodyPartQueries.updateWorkoutList(bodyPartId, workoutId);
        workoutDetails.save();
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally{
        await session.endSession();
    }
}

const calculateTime = async(workoutId) => {
    try{
        const exersices = await Workout.findById({workoutId:workoutId}).select('exercises') || (()=>{throw new Error('WorkoutId cannot found');})();
        return (exersices.lenght-1)*process.env.BREAK_TIME + exersices.reduce((totalReps, current)=>{return totalReps+current.reps},0)*process.env.EXERSICE_SINGLE_REP_TIME;
    }catch(err){
        throw err;
    }
}