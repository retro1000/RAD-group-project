import Role from "../models/role.model.js";

const getRoleByName = async(name) => {
    try{
        return await Role.findOne({name: name}).select('roleId name') || (()=>{throw new Error('No name found');})();
    }catch(err){
        throw err;
    }
}

const getAllRoles = async() => {
    try{
        return await Role.find().select('name') || (()=>{throw new Error('No role found');})();
    }catch(err){
        throw err;
    }
}

const getRoleByObjectId = async(objectId) => {
    try{
        return await Role.findOne({_id:objectId}) || (()=>{throw err;})();
    }catch(err){
        throw err;
    }
}

export const RoleQueries = {getRoleByObjectId, getAllRoles, getRoleByName};