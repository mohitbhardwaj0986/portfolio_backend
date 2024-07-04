import ErrorHandler from "../middleware/errorHandler.js";
import { asyncHandler } from "../middleware/catchasync.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Skills } from "../models/skills.model.js";

export const myskill = asyncHandler(async (req, res, next) => {
    const { skillName } = req.body;

    if (!skillName) {
        return next(new ErrorHandler("Please provide all fields", 400));
    }
    const skillImageLocalPath  = req.files?.skillImage[0]?.path;
    if (!skillImageLocalPath) {
        throw new ErrorHandler(500, "skill image local path not found")
    }


    const skillImage = await uploadOnCloudinary(skillImageLocalPath);

    const skill = await Skills.create({
        skillName,
        skillImage:skillImage.url
    });

    res.status(201).json({
        success: true,
        data: skill,
    });
});

export const getSkills = asyncHandler(async (req, res, next) => {
    const skills = await Skills.find();
    res.status(200).json({
        success: true,
        data: skills,
    });
})