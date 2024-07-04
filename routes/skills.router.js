import express from "express";
import { getSkills, myskill } from "../controllers/sikills.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/skillpost",
  upload.fields([
    {
      name: "skillImage",
      maxCount: 1,
    },
  ]),
  myskill
);
router.get("/getskills", getSkills)
export default router;
