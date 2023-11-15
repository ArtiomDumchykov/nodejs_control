import { NextFunction, Request, Response } from "express";

import { EToken } from "../enums";
import { ApiError } from "../errors";
import { ITokenPayload, IUser } from "../interfaces";
import { tokenRepository } from "../repositories";
import { passwordService, tokenService, userService } from "../services";

class AuthMiddleware {
  public async checkPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { password } = req.body as Partial<IUser>;
      const { password: hashedPassword } = req.res.locals.user as IUser;

      const isMatched = await passwordService.compare(password, hashedPassword);

      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenService.verifyToken(
        accessToken,
        EToken.ACCESS,
      ) as ITokenPayload;

      const [entity, user] = await Promise.all([
        tokenRepository.findOne({ accessToken }),
        userService.findOneById(String(payload._userId)),
      ]);

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;
      req.res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
