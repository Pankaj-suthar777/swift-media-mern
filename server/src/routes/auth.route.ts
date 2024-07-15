import {
  admin_login,
  get_user,
  update_user,
  user_login,
  user_register,
} from "#/controllers/auth";
import { authMiddleware } from "#/middleware/authMiddleware";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  SignInValidationSchema,
  UpdateUserSchema,
} from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

// user
router.post("/register", validate(CreateUserSchema), user_register);
router.post("/login", validate(SignInValidationSchema), user_login);
router.get("/get-user", authMiddleware, get_user);

// admin
router.post("/admin/login", admin_login);
router.get("/get-user", authMiddleware, get_user);

router.put(
  "/update-user-info",
  validate(UpdateUserSchema),
  authMiddleware,
  update_user
);

export default router;
