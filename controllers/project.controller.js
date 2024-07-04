import { Project } from "../models/project.model.js";
import ErrorHandler from "../middleware/errorHandler.js"
import {asyncHandler} from "../middleware/catchasync.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const postProject = asyncHandler(async (req, res, next) => {
    const {title, description, link, sorceLink} = req.body;
    if (!title || !description || !link || !sorceLink) {
        throw new ErrorHandler("please provite all fields", 401)
    }
    const projectImagePath = req.files?.projectImage[0]?.path;
    if (!projectImagePath) {
        throw new ErrorHandler(500, "project image local path not found")
    }
    const projectImage = await uploadOnCloudinary(projectImagePath);
    const project = await Project.create({
        title,
        description,
        link,
        sorceLink,
        projectImage:projectImage.url
    })
    res.status(201).json({
        success:true,
        data:project,
    })
})

export const getProject = asyncHandler(async (req, res, next)=> {
    const project = await Project.find();
    res.status(200).json({
        success:true,
        data:project,
    })
})