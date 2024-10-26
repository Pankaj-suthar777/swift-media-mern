import {
  getAllUsers,
  getDashboardData,
  popularUsers,
} from "#/controllers/admin";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/dashboard", authMiddleware, getDashboardData);
router.get("/get-all-users", authMiddleware, getAllUsers);
router.get("/get-popular-users", authMiddleware, popularUsers);

export default router;
