import { NextFunction, Request, Response } from "express";

import { fileConfigs } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req?.files?.avatar) {
        throw new ApiError("File not found. Please add a file.", 400);
      }

      if (Array.isArray(req.files.avatar)) {
        throw new ApiError("Only one file can be uploaded", 400);
      }

      const { size, mimetype } = req.files.avatar;
      if (size > fileConfigs.SIZE) {
        throw new ApiError("The file is too large", 400);
      }

      if (!fileConfigs.MIMETYPE.includes(mimetype)) {
        throw new ApiError("Invalid file format", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
