const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = mongoose.Schema({
    type: {
        type: String,
        trim: true,
        enum: ["admin", "student"],
        require: true

    },
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        minLength: 5,
        maxLength: 20
    },
    id: {
        type: String,
        trim: true,
        required: true,
    },
    pw: {
        type: String,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ["male", "female"]
    },
    dateOfBirth: {
        type: Date
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        trim: true,
        require: true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'ar-EG'))
                throw new Error("invalid mobile number")
        }
    },
    courses: [
        {
            title: {},
            grade: {},
            instructor: {},
            required: () => this.taskType == "student"

        }
    ],
    tokens: [

    ]
},
    {
        timestamps: true
    }
)
const userModel = mongoose.model("User", userSchema)
module.exports = userModel
