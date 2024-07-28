import {
  getUser,
  getRecommendedUser,
  followUser,
  isFollow,
} from "#/controllers/user";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/recommended-user", authMiddleware, getRecommendedUser);
router.post("/follow-user/:id", authMiddleware, followUser);
router.get("/is-follow/:id", authMiddleware, isFollow);
router.get("/:id", authMiddleware, getUser);

export default router;
