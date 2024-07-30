import {
  createPost,
  getFeed,
  getSinglePost,
  upOrDownVote,
  myPosts,
} from "#/controllers/post";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import {
  CreatePostSchema,
  UpVoteDownVoteSchema,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.get("/feed-post", authMiddleware, getFeed);
router.post("/new", validate(CreatePostSchema), authMiddleware, createPost);
router.post(
  "/up-or-down-vote/:id",
  validate(UpVoteDownVoteSchema),
  authMiddleware,
  upOrDownVote
);
router.post("/is-voted", authMiddleware, upOrDownVote);
router.get("/my-posts", authMiddleware, myPosts);

router.get("/:id", authMiddleware, getSinglePost);

export default router;
