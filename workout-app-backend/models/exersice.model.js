import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const exersiceSchema = new Schema({
    exersiceId:{
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
    type:{
        type: String,
        required: true
    },
    equipment:{
        type: String
    },
    difficulty:{
        type: String,
        required:true
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
    mainImage:{
        type: String,
        required: true
    },
    images:{
        type:[String],
        required:true
    },
    bodyPartIds:{
        type: [Number],
        required: true
    }
}, {timestamps:true});

const Exersice = model('Exersice', exersiceSchema);

export default Exersice;