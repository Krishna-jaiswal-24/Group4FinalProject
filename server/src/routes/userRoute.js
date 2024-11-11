import express from "express";

import { registerUser } from "../controllers/user/register.js";
import { loginUser } from "../controllers/user/login.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
