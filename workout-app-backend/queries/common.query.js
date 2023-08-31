const generateUniqueExerciseId = (existingIds, candidateId) => {
    try{
        return (existingIds.some(id => id.userId === candidateId))? generateUniqueExerciseId(existingIds, candidateId + 1):candidateId;
    }catch(err){
        throw err;
    }
};