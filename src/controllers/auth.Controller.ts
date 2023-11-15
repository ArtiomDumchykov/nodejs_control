import { NextFunction, Request, Response } from "express";

import { IToken, IUser } from "../interfaces";
import { userPresenter } from "../presenters";
import { authService } from "../services";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Partial<IUser>>> {
    try {
      const body = req.body;

      const user = await authService.register(body);

      return res.status(201).json({ data: userPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IToken>> {
    try {
      const response = req.res.locals.user as IUser;

      const tokens = (await authService.login(response)) as IToken;

      const { accessToken, refreshToken } = tokens;

      return res.status(201).json({ data: { accessToken, refreshToken } });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
