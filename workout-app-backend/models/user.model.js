import { Schema, model } from 'mongoose';

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
    contactNo:{
        type: String
    },
    email:{
        type: String
    },
    level:{
        type: String
    },
    //map=>(workout, time, duration, status, periodCal, etc)
    workouts:{
        type:[Map],
        of: Schema.Types.Mixed
    },
    roles:{
        type:[Map],
        of: Schema.Types.Mixed
    }
}, {timestamps:true});

const User = model('User', userSchema);

export default User;