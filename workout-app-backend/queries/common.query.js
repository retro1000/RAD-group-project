const generateUniqueId = (existingIds, candidateId) => {
    try{
        return (existingIds.includes(candidateId))?generateUniqueId(existingIds, candidateId + 1):candidateId;
    }catch(err){
        throw err;
    }
};

export const CommonQueries = {generateUniqueId};