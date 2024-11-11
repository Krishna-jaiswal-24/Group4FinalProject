import * as User from "../../models/user/services.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    //check if user already exists with the given username
    const userExists = await User.getUser({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
    });

    if (!newUser) {
      return res.status(400).json({ message: "User registration failed" });
    }

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        username: newUser.username,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
