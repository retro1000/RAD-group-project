import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const bodyPartSchema = new Schema({
    bodyPartId:{
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
    image:{
        type: String,
        required: true
    },
    workouts:{
        type: [Number]
    },
    exersices:{
        type: [Number]
    }

}, {timestamps:true});

const BodyPart = model('BodyPart', bodyPartSchema);

export default BodyPart;