import jwt from "jsonwebtoken"
import ErrorHandler from "./errorHandler.js"
import {asyncHandler} from "./catchasync.js"
import { User } from "../models/user.Model.js"

export const protect = asyncHandler(async (req,res,next)=>{
    const {token} = req.cookies
    try {
        if (!token) {
            return next(new ErrorHandler("please login first"))
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = User.findById(decoded.id)
        next()
    } catch (error) {
        return next(new ErrorHandler("invaled token" , 401))
    }
})