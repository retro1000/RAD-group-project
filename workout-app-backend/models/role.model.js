import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const roleSchema = new Schema({
    roleId:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
}, {timestamps:true});

const Role = model('Role', roleSchema);

export default Role;