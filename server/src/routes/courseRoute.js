import * as courseController from "../controllers/courses/controller.js";
import express from "express";

const router = express.Router();

router.post("/create", courseController.createCourse);
router.get("/fetch", courseController.fetchCourses);
router.get("/:courseId", courseController.getCourseById);
router.delete("/:courseId", courseController.deleteCourse);
router.put("/:courseId", courseController.updateCourse);


export default router;