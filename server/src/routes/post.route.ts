import {
  createPost,
  getFeed,
  getSinglePost,
  upOrDownVote,
  myPosts,
  toogleSavePost,
  getSavedPost,
  isPostSaved,
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

router.post("/save/:postId", authMiddleware, toogleSavePost);
router.get("/get-saved-post", authMiddleware, getSavedPost);
router.get("/is-post-saved/:postId", authMiddleware, isPostSaved);

router.get("/:id", authMiddleware, getSinglePost);

export default router;
