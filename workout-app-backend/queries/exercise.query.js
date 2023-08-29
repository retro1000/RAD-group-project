import Exersice from "../models/exersice.model";

const getExersiceByRules = async(age, gender, start, limit) => {
    try{
        return await Exersice.find($and[{age:age}, {gender:gender}])
            .select('exersiceId', 'name', 'img')
            .skip(start)
            .limit(limit);
    }catch(err){
        throw err;
    }
}

const getExersiceById = async(exersiceId) => {
    try{
        return await Exersice.findOne({exersiceId: exersiceId});
    }catch(err){
        throw err;
    }
}