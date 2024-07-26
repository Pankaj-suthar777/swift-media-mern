import { getUser, getRecommendedUser } from "#/controllers/user";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/recommended-user", authMiddleware, getRecommendedUser);
router.get("/:id", authMiddleware, getUser);

export default router;
