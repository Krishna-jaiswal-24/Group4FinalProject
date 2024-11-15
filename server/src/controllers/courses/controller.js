import * as Course from "../../models/courses/services.js";
import { enrollInCourse } from "../../models/user/services.js";

export const createCourse = async (req, res) => {
  try {
    const { title, details, semester } = req.body;
    const newCourse = await Course.create({
      title,
      details,
      semester,
    });
    return res.status(201).json({
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchCourses = async (req, res) => {
  try {
    const courses = await Course.getCourses({});
    return res.status(200).json({
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.getCourses({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.deleteCourse({ _id: courseId });
    return res.status(200).json({
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, details, semester, userId } = req.body;
    const updatedCourse = await Course.update(
      { _id: courseId },
      { title, details, semester, $push: { enrollStatus: userId } }
    );
    return res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const enrollInCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    const result = await enrollInCourse(userId, courseId);

    return res.status(200).json({
      message: result.message,
      data: result,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
