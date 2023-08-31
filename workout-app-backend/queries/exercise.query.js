import {Exersice} from "../models/exersice.model.js";
import mongoose, { mongo, startSession } from "mongoose";

const BodyPartQueries = require('./bodyPart.query.js');
const CommonQueries = require('../queries/common.query.js');

const getExersiceByRules = async(bodyPartIds, age, gender, start, limit) => {
    try{
        return await Exersice.find($and[{age:age}, {gender:gender}, {bodyPartIds:{$in: bodyPartIds}}])
            .select('exersiceId name img')
            .skip(start)
            .limit(limit)
            || (()=>{throw new Error('No exercise found');})();
    }catch(err){
        throw err;
    }
}

const getExersiceById = async(exersiceId) => {
    try{
        return await Exersice.findOne({exersiceId: exersiceId})
            .select('exersiceId name age gender steps mainImage images')
            || (()=>{throw new Error('No exersiceId found');})();
    }catch(err){
        throw err;
    }
}

const getExersiceByIds = async(idList) => {
    try{
        return await Exersice.find({exersiceId:{$in: idList}},{new:true}) 
            .select('exersiceId name mainImage')
            || (()=>{throw new Error('exersiceIds not found');})();
    }catch(err){
        throw err;
    }
}

const createNewExersice = async({name, age, gender, mainImage, images, steps, bodyPartIds}) => {
    const session = mongoose.startSession();
    try{
        session.startTransaction();
        const existingIds = await Exersice.find().select('userId');
        const exersiceId = await CommonQueries.generateUniqueExerciseId(existingIds, existingIds+1);
        await BodyPartQueries.updateExersicesList(bodyPartIds, exersiceId);
        const exersiceDetails = new Exersice(
            exersiceId, name, age, gender, steps, mainImage, images, bodyPartIds
        );
        await exersiceDetails.save();
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally{
        await session.endSession();
    }
}