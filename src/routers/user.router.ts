import { Router } from "express";

import { userController } from "../controllers";
import { IUser } from "../interfaces";
import {
  authMiddleware,
  commonMiddleware,
  fileMiddleware,
  managerMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userController.getAll,
);

router.get(
  "/info/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userMiddleware.getByParamsAndThrow<IUser>("email"),
  userController.create,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userMiddleware.getByIdOrThrow,
  userController.update,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.getByIdOrThrow,
  userController.delete,
);

router.patch(
  "/avatar",
  fileMiddleware.uploadAvatar,
  authMiddleware.checkAccessToken,
  userController.updateAvatar,
);

router.patch(
  "/premium",
  authMiddleware.checkAccessToken,
  userMiddleware.isPremiumAndThrow,
  userController.premium,
);

export const userRouter = router;
