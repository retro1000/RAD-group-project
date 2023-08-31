import BodyPart from "../models/bodyPart.model";

const getAllBodyParts = async ()=>{
    try{
        return await BodyPart.find().select('bodyPartId name image') || (()=>{throw new Error('No body part found');})();
    }catch(err){
        throw err;
    }
}

const getAllExersicesForBodyPart = async(bodyPartId)=>{
    try{
        return await BodyPart.find({bodyPartId:bodyPartId}).select('exersices') || (()=>{throw new Error('No bodyPartId found');})();
    }catch(err){
        throw err;
    }
}

const getAllWorkoutsForBodyPart = async(bodyPartId)=>{
    try{
        return await BodyPart.find({bodyPartId:bodyPartId}).select('workouts') || (()=>{throw new Error('No bodyPartId found');})();
    }catch(err){
        throw err;
    }
}

const updateExersicesList = async(bodyPartIdList, exersiceId)=>{
    try{
        await BodyPart.findByIdAndUpdate(
            {bodyPartId:{$in:bodyPartIdList}},
            {$push:{exersices:exersiceId}},
            {new: false}
        ) || (()=>{throw new Error('No bodyPartId found');})();
    }catch(err){
        throw err;
    }
}

const updateWorkoutList = async(bodyPartId, workoutId)=>{
    try{
        await BodyPart.findByIdAndUpdate(
            {bodyPartId:bodyPartId},
            {$push:{workouts:workoutId}},
            {new: false}
        ) || (() => {throw new Error('Body part not found');})();
    }catch(err){
        throw err;
    }
}