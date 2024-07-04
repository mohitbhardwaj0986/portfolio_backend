import mongoose from "mongoose";

const projextSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    sorceLink:{
        type:String,
        required:true
    }
})

export const Project = mongoose.model("Project",projextSchema)