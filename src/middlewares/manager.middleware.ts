import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { IUser } from "../interfaces";

class ManagerMiddleware {
  public async isAdminOrManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { status } = req.res.locals.user as IUser;

      const isAdmin = status === "admin";
      const isManager = status === "manager";

      if (isAdmin || isManager) {
        next();
      } else {
        throw new ApiError("Not enough permissions", 403);
      }
    } catch (e) {
      next(e);
    }
  }
}

export const managerMiddleware = new ManagerMiddleware();
