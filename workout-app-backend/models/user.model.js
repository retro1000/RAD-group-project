import { Schema, model } from 'mongoose';
import Role from './role.model.js';

const userSchema = new Schema({
    userId:{
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
        type: Number,
        trim: true,
    },
    gender:{
        type: String,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength:6
    },
    password:{
        type: String,
        required: true
    },
    heigth:{
        type: Number
    },
    weigth:{
        type: Number
    },
    //map=>(workout, time, duration, status, periodCal, etc)
    workouts:{
        type:[Map],
        of: Schema.Types.Mixed
    },
    roles:{
        type: [Schema.Types.ObjectId],
        ref: 'Role',
    }
}, {timestamps:true});

const User = model('User', userSchema);

export default User;