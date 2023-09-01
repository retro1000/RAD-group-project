const generateUniqueId = (existingIds, candidateId) => {
    try{
        return (existingIds.some(Id => Id === candidateId))? generateUniqueExerciseId(existingIds, candidateId + 1):candidateId;
    }catch(err){
        throw err;
    }
};

export const CommonQueries = {generateUniqueId};