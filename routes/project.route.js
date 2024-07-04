import express from "express"
import {getProject, postProject } from "../controllers/project.controller.js"
import { upload } from "../middleware/multer.js";


const router = express.Router()

router.post("/projetpost", upload.fields([{
    name:"projectImage",
    maxCount:1
}]),postProject)
router.get("/getproject", getProject)

export default router