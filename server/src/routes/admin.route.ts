import { getAllUsers, getDashboardData } from "#/controllers/admin";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/dashboard", authMiddleware, getDashboardData);
router.get("/get-all-users", authMiddleware, getAllUsers);

export default router;
