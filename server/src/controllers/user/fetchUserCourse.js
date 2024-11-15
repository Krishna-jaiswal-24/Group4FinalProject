import * as User from "../../models/user/services.js";

export const fetchUserCourse = async (req, res) => {
  try {
    console.log("fetchUserCourse called", req.user);
    const user = await User.getUser({_id:req.user.userId});
    console.log("fetchUserCourse user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User course fetched successfully",
      data: {
        course: user.courses,
      },
    });
  } catch (error) {
    console.error("Error fetching user course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
