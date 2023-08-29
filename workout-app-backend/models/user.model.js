const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    }

}, {timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;