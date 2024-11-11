import * as User from "../../models/user/services.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.getUser({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      data: {
        username: user.username,
        name: user.name,
        userId: user._id,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
