import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { userService } from "../services";

class UserMiddleware {
  public getByParamsAndThrow<T>(params: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const value = req.body[params];
        const user = await userService.getOneByParams({ [params]: value });
        if (user) {
          throw new ApiError("Invalid credentials provided", 400);
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public getByParamsOrThrow<T>(params: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const value = req.body[params];
        const user = await userService.getOneByParams({ [params]: value });
        if (!user) {
          throw new ApiError("Invalid credentials provided", 401);
        }
        req.res.locals.user = user;
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await userService.getOneByParams({ _id: userId });
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      req.res.locals.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }

  public async isPremiumAndThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals.user as IUser;
      if (user.premium) {
        throw new ApiError("Primium account is already", 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  public async isPremiumOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals.user as IUser;
      if (!user.premium) {
        throw new ApiError("Premium account is not available", 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const userMiddleware = new UserMiddleware();
