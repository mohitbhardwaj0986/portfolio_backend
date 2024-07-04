import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    skillName:{
        type:String,
        required:true
    },
    skillImage:{
        type:String,
        required:true
    }
  
})

export const Skills = mongoose.model("skills",skillsSchema)