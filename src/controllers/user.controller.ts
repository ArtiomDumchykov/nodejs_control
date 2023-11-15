import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { IQuery, IUser, IUserResponse, IUsersResponse } from "../interfaces";
import { userPresenter } from "../presenters";
import { authService, userService } from "../services";

class UserController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): IUserResponse {
    try {
      const dto = req.body as IUser;

      const userData = await authService.register(dto);

      const _userPresenter = userPresenter.present(userData);

      return res.status(201).json({ data: _userPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): IUserResponse {
    try {
      const dto = req.res.locals.user as IUser;

      const _userPresenter = userPresenter.present(dto);

      return res.status(200).json({ data: _userPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): IUserResponse {
    try {
      const dto = req.body as IUser;
      const { userId } = req.params;

      const userData = await userService.update(dto, userId);

      const _userPresenter = userPresenter.present(userData);

      return res.status(201).json({ data: _userPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async premium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): IUserResponse {
    try {
      const dto = req.res.locals.user as IUser;

      const user = await userService.update({ premium: true }, String(dto._id));

      const _userPresenter = userPresenter.present(user);

      return res.status(201).json({ data: _userPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async updateAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): IUserResponse {
    try {
      const dto = req.res.locals.user as IUser;
      const file = req.files.avatar as UploadedFile;

      const userData = await userService.updateAvatar(dto, file);

      const _userPresenter = userPresenter.present(userData);

      return res.status(201).json({ data: _userPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;

      await userService.delete(userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): IUsersResponse {
    try {
      const query = req.query as IQuery;

      const usersData = await userService.getAll(query);

      const _userPresenter = {
        ...usersData,
        data: await userPresenter.presents(usersData.data),
      };

      return res.status(200).json({ data: _userPresenter });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
