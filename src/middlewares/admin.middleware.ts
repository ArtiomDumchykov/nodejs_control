import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { userService } from "../services";

class AdminMiddleware {
  public async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals.user as IUser;

      if (user.status !== "admin") {
        throw new ApiError("Insufficient rights to view content", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  public async adminIsRegistered(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const searchOptions = { status: "admin" };

      const adminUser = await userService.getOneByParams(searchOptions);

      if (adminUser) {
        throw new ApiError("Registered is admin, can be only one", 400);
      }

      req.body = { ...req.body, status: "admin", premium: true };

      next();
    } catch (error) {
      next(error);
    }
  }
}

export const adminMiddleware = new AdminMiddleware();
