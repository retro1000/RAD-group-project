import Role from "../models/role.model.js";

const getRoleByName = async(name) => {
    try{
        return await Role.findOne({name: name}) || (()=>{throw new Error('No name found');})();
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

export const RoleQuery = {getAllRoles, getRoleByName};