import {
  admin_login,
  get_user,
  user_login,
  user_register,
} from "#/controllers/auth";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

// user
router.post("/register", user_register);
router.post("/login", user_login);
router.get("/get-user", authMiddleware, get_user);

// admin
router.post("/login", admin_login);
router.get("/get-user", authMiddleware, get_user);

export default router;
