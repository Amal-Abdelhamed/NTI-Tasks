const mongoose = require('mongoose')
const validator = require("validator")
const taskModel = mongoose.model("task",{
    title:{
        type:String,
        required: true,
        trim:true,
        minLength:2,
        maxLength:30,
        unique:true
    },
    content:{
        type:String,
        required: true,
        trim:true,
        minLength:2,
        maxLength:30,
        unique:true
    },
    status:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date
    }
})

module.exports = taskModel