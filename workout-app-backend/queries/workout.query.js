import Workout from "../models/workout.model";

const getWorkoutByRules = async(age, gender, start, limit) => {
    try{
        return await Workout.find($and[{age:age}, {gender:gender}])
            .select('workoutId', 'name', 'img')
            .skip(start)
            .limit(limit);
    }catch(err){
        throw err;
    }
}

const getWorkoutById = async(workoutId) => {
    try{
        return await Workout.findOne({workoutId: workoutId});
    }catch(err){
        throw err;
    }
}