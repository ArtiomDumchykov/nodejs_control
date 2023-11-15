import { Router } from "express";

import { carController } from "../controllers";
import {
  authMiddleware,
  carMiddleware,
  commonMiddleware,
  fileMiddleware,
} from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.post(
  "",
  commonMiddleware.isBodyValid(CarValidator.create),
  authMiddleware.checkAccessToken,
  carMiddleware.countCar,
  carController.create,
);

router.get("", carController.getAll);

router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);

router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  authMiddleware.checkAccessToken,
  carMiddleware.getByCarIdAndUserIdOrThrow,
  carController.deleteById,
);

router.put(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  authMiddleware.checkAccessToken,
  carMiddleware.getByCarIdAndUserIdOrThrow,
  carController.update,
);

router.patch(
  "/photo/:carId",
  commonMiddleware.isIdValid("carId"),
  fileMiddleware.uploadAvatar,
  authMiddleware.checkAccessToken,
  carMiddleware.getByCarIdAndUserIdOrThrow,
  carController.updatePhoto,
);

export const carRouter = router;
