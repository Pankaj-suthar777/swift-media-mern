import { createPost, getFeed } from "#/controllers/post";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import { CreatePostSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.get("/feed-post", authMiddleware, getFeed);
router.post("/new", validate(CreatePostSchema), authMiddleware, createPost);

export default router;
