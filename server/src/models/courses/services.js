import Course from "./schema.js";

export const create = async (payload) => {
  try {
    const newCourse = await Course.create(payload);
    return newCourse;
  } catch (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }
};

export const update = async (query, payload) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(query, payload, {
      new: true,
    });
    if (!updatedCourse) {
      throw new Error("Course not found");
    }
    return updatedCourse;
  } catch (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }
};

export const deleteCourse = async (query) => {
  try {
    const deletedCourse = await Course.findOneAndDelete(query);
    if (!deletedCourse) {
      throw new Error("Course not found");
    }
    return deletedCourse;
  } catch (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
};

export const getCourses = async (query) => {
  try {
    const courses = await Course.find(query).lean();
    return courses;
  } catch (error) {
    throw new Error(`Failed to get courses: ${error.message}`);
  }
};

