import { authLimiter } from "#/config/rateLimit";
import {
  admin_login,
  get_user,
  update_password,
  update_user,
  user_login,
  user_register,
} from "#/controllers/auth";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  SignInValidationSchema,
  UpdatePasswordSchema,
  UpdateUserSchema,
} from "#/utils/validationSchema";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";
import { SECRET } from "../utils/variables";
import { User } from "@prisma/client";
import { createToken } from "#/utils/createToken";
const router = Router();

// user
router.post(
  "/register",
  authLimiter,
  validate(CreateUserSchema),
  user_register
);
router.post(
  "/login",
  authLimiter,
  validate(SignInValidationSchema),
  user_login
);
router.get("/get-user", authLimiter, authMiddleware, get_user);
router.post(
  "/update-password",
  validate(UpdatePasswordSchema),
  authLimiter,
  authMiddleware,
  update_password
);
router.put(
  "/update-user-info",
  authLimiter,
  validate(UpdateUserSchema),
  authMiddleware,
  update_user
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    // Successful authentication
    const user = req.user as User;

    const token = await createToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: "user",
      followersCount: 0,
      followingCount: 0,
      about: user.about,
      backgroundImage: user.backgroundImage,
      avatar: user.avatar,
    });

    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

// admin
router.post("/admin/login", authLimiter, admin_login);
router.get("/get-user", authLimiter, authMiddleware, get_user);

export default router;
