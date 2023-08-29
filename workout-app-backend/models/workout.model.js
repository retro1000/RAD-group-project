import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const workoutSchema = new Schema({
    workoutId:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    age:{
        type: [Number],
        trim: true,
    },
    gender:{
        type: [String]
    },
    exercises:{
        type: [Map],
        of: _Schema.Types.Mixed,
        required: true
    }
}, {timestamps:true});

const Workout = model('Workout', workoutSchema);

export default Workout;