import Exersice from "../models/exersice.model.js";
import mongoose, { mongo, startSession } from "mongoose";
import {BodyPartQueries} from './bodyPart.query.js';
import {CommonQueries} from '../queries/common.query.js';

const getExersiceByRules = async(bodyPartId, age, gender, type, equipment, difficulty, start, limit) => {
    try{
        return await Exersice.find({type:type, equipment:equipment, difficulty:difficulty,age:age, gender:gender, bodyPartIds:{$in: bodyPartId}})
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
            .select('exersiceId name type equipment difficulty age gender steps mainImage images')
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

const createNewExersice = async(name, type, equipment, difficulty, age, gender, mainImage, images, steps, bodyPartIds) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const existingIds = (await Exersice.find().select('exersiceId')).map(Id=>Id.exersiceId);
        const exersiceId = await CommonQueries.generateUniqueId(existingIds, existingIds.length+1);
        const exersiceDetails = new Exersice({
            exersiceId:exersiceId, 
            name:name,
            type:type,
            equipment:equipment,
            difficulty:difficulty,
            age:age, 
            gender:gender,
            steps:steps,
            mainImage:mainImage,
            images:images,
            bodyPartIds:bodyPartIds
        });
        await exersiceDetails.save() || (()=>{throw new Error('cannot save')});
        await BodyPartQueries.updateExersicesList(bodyPartIds, exersiceId);
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        throw err;
    }finally{
        await session.endSession();
    }
}

export const ExersiceQueries = {createNewExersice, getExersiceById, getExersiceByIds, getExersiceByRules};