import {
  createPost,
  getFeed,
  getSinglePost,
  upOrDownVote,
  myPosts,
  toogleSavePost,
  getSavedPost,
  isPostSaved,
  addComment,
  getPostComment,
  addReplayComment,
  addReplayToReplayComment,
  toogleCommentVote,
  toogleCommentReplayVote,
  toogleReplayedCommentReplyVote,
  deletePost,
  updatePost,
} from "#/controllers/post";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import {
  CreatePostSchema,
  UpVoteDownVoteSchema,
  AddCommentSchema,
  AddReplayToReplayCommentSchema,
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

router.post(
  "/add-comment/:id",
  validate(AddCommentSchema),
  authMiddleware,
  addComment
);
router.post(
  "/add-replay-comment/:id",
  validate(AddCommentSchema),
  authMiddleware,
  addReplayComment
);
router.post(
  "/add-replay-to-replay",
  validate(AddReplayToReplayCommentSchema),
  authMiddleware,
  addReplayToReplayComment
);

router.post("/toggle-comment-vote/:id", authMiddleware, toogleCommentVote);

router.post(
  "/toggle-reply-comment-vote/:id",
  authMiddleware,
  toogleCommentReplayVote
);

router.post(
  "/toggle-reply-to-reply-comment-vote/:id",
  authMiddleware,
  toogleReplayedCommentReplyVote
);

router.get("/comment/:id", authMiddleware, getPostComment);

router.get("/:id", authMiddleware, getSinglePost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);

export default router;
