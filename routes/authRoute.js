import express from "express";
import {
  getMyValidatedUser,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/validateToken", verifyToken, getMyValidatedUser);
router.post("/logout", logoutUser);

export default router;
