import BodyPart from "../models/bodyPart.model";

const getAllBodyParts = async ()=>{
    try{
        return BodyPart.find();
    }catch(err){
        throw err;
    }
}