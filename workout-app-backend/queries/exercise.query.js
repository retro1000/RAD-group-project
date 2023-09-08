import Exersice from "../models/exersice.model.js";
import mongoose, { mongo, startSession } from "mongoose";
import {BodyPartQueries} from './bodyPart.query.js';
import {CommonQueries} from '../queries/common.query.js';

const getExersiceByRules = async(bodyParts, types, difficulties, equipments) => {
    try{
        const combinations = [];
        const filter = {$or: [] };
        for(const bodyPartIds of bodyParts) for(const type of types) for(const difficulty of difficulties) for(const equipment of equipments) combinations.push({type, difficulty, equipment, bodyPartIds});
        for (const combo in combinations) filter.$or.push({type:combinations[combo].type, equipment:combinations[combo].equipment, difficulty:combinations[combo].difficulty, bodyPartIds:combinations[combo].bodyPartIds});
        console.log(filter);
        return await Exersice.find(filter).select('exersiceId name img') || (()=>{throw new Error('No exercise found');})();
    }catch(err){
        throw err;
    }
}

const getExersiceSortKeys = async(bodyPartId) => {
    try{
        var list = {type:[], difficulty:[], equipment:[]};
        const values = await Exersice.find({bodyPartIds:{$in: bodyPartId}}).select('type difficulty equipment') || (()=>{throw new Error('No exercise found');})();
        for(const itm in values){
            const{type, difficulty, equipment} = values[itm];
            list.type.push(type);
            list.difficulty.push(difficulty);
            list.equipment.push(equipment);
        }
        for(const key in list) list[key]=[...(new Set(list[key]))];
        return [{name:'Type', data:list.type}, {name:'Difficulty', data:list.difficulty}, {name:'Equipment', data:list.equipment}];
    }catch(err){
        throw err;
    }
}

const getExersiceById = async(exersiceId) => {
    try{
        return await Exersice.findOne({exersiceId: exersiceId})
            .select('exersiceId name type equipment difficulty steps mainImage images')
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

// const createNewExersice = async(exersiceIds, name, type, equipment, difficulty, age, gender, mainImage, images, steps, bodyPartIds) => {
//     const session = await mongoose.startSession();
//     console.log('hit');
//     try{
//         session.startTransaction();
//         const exersiceId = exersiceIds;
//         // const existingIds = (await Exersice.find().select('exersiceId')).map(Id=>Id.exersiceId);
//         // const exersiceId = await CommonQueries.generateUniqueId(existingIds, existingIds.length+1);
//         const exersiceDetails = new Exersice({
//             exersiceId:exersiceId, 
//             name:name,
//             type:type,
//             equipment:equipment,
//             difficulty:difficulty,
//             age:age, 
//             gender:gender,
//             steps:steps,
//             mainImage:mainImage,
//             images:images,
//             bodyPartIds:bodyPartIds
//         });
//         await exersiceDetails.save() || (()=>{throw new Error('cannot save')});
//         await BodyPartQueries.updateExersicesList(bodyPartIds, exersiceId);
//         await session.commitTransaction();
//     }catch(err){
//         await session.abortTransaction();
//         throw err;
//     }finally{
//         await session.endSession();
//     }
// }

export const ExersiceQueries = {getExersiceSortKeys, getExersiceById, getExersiceByIds, getExersiceByRules};