import ErrorHandler from "../middleware/errorHandler.js";
import {asyncHandler}  from "../middleware/catchasync.js"
import { User } from "../models/user.Model.js";
import { sendToken } from "../utils/jwtToken.js";


export const register = asyncHandler(async (req, res, next)=> {
    const {username,password} = req.body;
    if (!username || !password) {
        return next(new ErrorHandler("Please provide username and password",400))
    }
    const user = await User.create({username,password});
   sendToken(user, 201, res, "user register successfully")
})

export const login = asyncHandler(async (req, res, next)=> {
    const {username,password} = req.body;
    if (!username ||!password) {
        throw new ErrorHandler(500, "provide username and password")
    }
    const user = await User.findOne({username})
    if (!user) {
       throw  new ErrorHandler(401,"Invalid username or password")
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
         throw new ErrorHandler(401,"Invalid username or password")
    }
    sendToken(user, 200, res, "user login successfully")
})
export const logout = asyncHandler(async (req, res, next) => {
    res.cookie("token","", {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({
        success: true,
        message: "user logout successfully"
    })
})