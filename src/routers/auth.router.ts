import { Router } from "express";

import { authController } from "../controllers";
import { IUser } from "../interfaces";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.getByParamsAndThrow<IUser>("email"),
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.getByParamsOrThrow<IUser>("email"),
  authMiddleware.checkPassword,
  authController.login,
);

export const authRouter = router;
