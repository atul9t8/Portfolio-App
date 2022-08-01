const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email:{
        type : String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    cPassword:{
        type: String,
    },
    role:{
        type: String,
        required: true
    },
    fromWhere:{
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    }
})

const singleAwardsSchema = new Schema({
    name :{
        type: String,
        required:false
    },
    position:{
        type: String,
        required:false
    },
    year:{
        type: String,
        required:false
    }
})

const userSchema = new mongoose.Schema({
    registration: registrationSchema,
    awards:[singleAwardsSchema],
    skills: {
        type: Array,
        required: false
    } 
    
})


module.exports =  mongoose.model("User", userSchema)
