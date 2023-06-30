const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'name is require']
    },
    email:{
        type:String,
        required:  [true,'email is require']
    },
    phone:{
        type:Number,
        required:  [true,'Phone Number is require']
    },
    password:{
        type:String,
        required: [true,'password is require']
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;