import * as courseController from "../controllers/courses/controller.js";
import express from "express";
import { authenticationToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/create",authenticationToken, courseController.createCourse);
router.get("/fetch",authenticationToken, courseController.fetchCourses);
router.get("/:courseId",authenticationToken, courseController.getCourseById);
router.delete("/:courseId",authenticationToken, courseController.deleteCourse);
router.put("/:courseId",authenticationToken, courseController.updateCourse);
router.post("/:courseId/enroll", authenticationToken, courseController.enrollInCourseController);

export default router;