import User from "./schema.js";
import Course from "../courses/schema.js";

export const getUserById = ( userId ) =>{
  console.log("fetchUserCourse called userId", userId);
  User.findById(userId)
    .lean()
    .catch((error) => {
      throw new Error(error);
    });
}

export const create = (payload) =>
  User.create(payload).catch((error) => {
    throw new Error(error);
  });

export const getUser = (query) =>
  User.findOne(query)
    .lean()
    .populate("courses")
    .catch((error) => {
      throw new Error(error);
    });

export const enrollInCourse = async (userId, courseId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    if (user.courses.includes(courseId)) {
      throw new Error("User is already enrolled in this course");
    }

    user.courses.push(courseId);

    course.enrollStatus.push(userId);

    await user.save();
    await course.save();

    return { message: "Enrollment successful" };
  } catch (error) {
    throw new Error(`Failed to enroll in course: ${error.message}`);
  }
};
