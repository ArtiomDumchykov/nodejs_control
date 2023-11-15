import { Router } from "express";

import { authController, userController } from "../controllers";
import { IUser } from "../interfaces";
import {
  adminMiddleware,
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.register),
  adminMiddleware.adminIsRegistered,
  userMiddleware.getByParamsAndThrow<IUser>("email"),
  authController.register,
);

router.put(
  "/:userId",
  commonMiddleware.isBodyValid(UserValidator.updateStatus),
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  adminMiddleware.isAdmin,
  userController.update,
);
export const adminRouter = router;
