import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { carService } from "../services";

class CarMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { carId } = req.params;
      const carData = await carService.getFindById(carId);

      if (!carData) {
        throw new ApiError("Car not found", 404);
      }

      req.res.locals.car = carData;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async getByCarIdAndUserIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _id, status } = req.res.locals.user as IUser;
      const { carId } = req.params;
      const carData = await carService.getFindById(carId);

      const isAdmin = status === "admin";
      const isManager = status === "manager";
      const isUserCar = String(carData?._userId) === String(_id);

      if (!carData) {
        throw new ApiError("Car not found", 404);
      }

      if (isAdmin || isManager || isUserCar) {
        req.res.locals.car = carData;
        next();
      } else {
        throw new ApiError("Insufficient rights to access this car", 403);
      }
    } catch (e) {
      next(e);
    }
  }

  public async countCar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _id, premium } = req.res.locals.user as IUser;

      if (!premium) {
        const countCars = await carService.getFindCountCarById(String(_id));
        if (countCars >= 1) {
          throw new ApiError(
            "Without a premium account, you can add only one advertisement",
            403,
          );
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
