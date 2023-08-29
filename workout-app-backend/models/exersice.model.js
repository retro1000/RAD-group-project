import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const exersiceSchema = new Schema({
    exersiceId:{
        type: String,
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
        required: true,
        trim: true,
    },
    gender:{
        type: [String],
        required: true
    },
    steps:{
        type:[String],
        required: true
    },
    bodyParts:{
        type:[bodyPartSchema],
        required: true
    },
    images:{
        type:[String],
        required:true
    }
}, {timestamps:true});

const Exersice = model('Exersice', exersiceSchema);

export default Exersice;