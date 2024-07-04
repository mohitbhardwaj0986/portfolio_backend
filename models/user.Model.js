import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})

// hash password 
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// generate token
userSchema.methods.generateToken =  function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY)
}

export const User = mongoose.model("User",userSchema);