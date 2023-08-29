import { Schema as _Schema, model } from 'mongoose';
import Role from './role.model';

const Schema = _Schema;

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
        required: true,
        trim: true,
    },
    gender:{
        type: String,
        required: true
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
    //map=>(workout, duration, status, periodCal, etc)
    workouts:{
        type:[Map],
        of: _Schema.Type.Mixed
    },
    roles:{
        type:[Role],
        required: true
    }
}, {timestamps:true});

const User = model('User', userSchema);

export default User;