import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";
import userRouter from "./routes/user.router.js"
import skillsRouter from "./routes/skills.router.js"
import projectRouter from "./routes/project.route.js"

const app = express();

dotenv.config({ path: ".env" });

app.use(
  cors({
    origin: [process.env.FRONTENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/skills", skillsRouter)
app.use("/api/v1/project", projectRouter)

dbConnection()

export default app;
