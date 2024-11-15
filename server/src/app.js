import express from "express";
import cors from "cors";
import morgan from "morgan";
import UserRouter from "./routes/userRoute.js";
import CourseRouter from "./routes/courseRoute.js";
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/course", CourseRouter);

export default app;
