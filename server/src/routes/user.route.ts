import {
  getUser,
  getRecommendedUser,
  followUser,
  isFollow,
  serachUser,
  getUserPosts,
  getDashboardData,
  getDashboardMessageSentData,
  getDashboardPostActivityData,
  getUserFollowingList,
  getUserFollowersList,
  getAllPeoples,
  getMyNotifications,
  getMyNotificationsCount,
  seenNotification,
} from "#/controllers/user";
import { authMiddleware } from "#/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.get("/dashboard", authMiddleware, getDashboardData);
router.get(
  "/dashboard/messages-send-data",
  authMiddleware,
  getDashboardMessageSentData
);
router.get(
  "/dashboard/post-vote-data",
  authMiddleware,
  getDashboardPostActivityData
);
router.get("/get-notification", authMiddleware, getMyNotifications);
router.get("/get-notification-count", authMiddleware, getMyNotificationsCount);
router.put("/seen-notification", authMiddleware, seenNotification);

router.get("/get-peoples", authMiddleware, getAllPeoples);
router.get("/recommended-user", authMiddleware, getRecommendedUser);
router.post("/follow-user/:id", authMiddleware, followUser);
router.get("/is-follow/:id", authMiddleware, isFollow);
router.get("/search-user", authMiddleware, serachUser);
router.get("/post/:userId", authMiddleware, getUserPosts);
router.get("/get-following-list/:id", authMiddleware, getUserFollowingList);
router.get("/get-followers-list/:id", authMiddleware, getUserFollowersList);
router.get("/:id", authMiddleware, getUser);

export default router;
