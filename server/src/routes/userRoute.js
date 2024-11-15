import express from "express";

import { registerUser } from "../controllers/user/register.js";
import { loginUser } from "../controllers/user/login.js";
import { fetchUserCourse } from "../controllers/user/fetchUserCourse.js";
import { authenticationToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userCourse",authenticationToken,fetchUserCourse)
export default router;
