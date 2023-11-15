import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ECarStatus } from "../enums";
import { ICar, IQuery, IUser } from "../interfaces";
import { carPresenter } from "../presenters";
import { carService, viewingService } from "../services";

class CarController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body as ICar;
      const user = req.res.locals.user as IUser;

      const car = await carService.create(body, user);

      const carPresent = await carPresenter.present(car);

      res.status(201).json({ data: carPresent });
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Partial<ICar[]>>> {
    try {
      const query = req.query as IQuery;

      const cars = await carService.getAll(query, ECarStatus.ACTIVE);

      const carsPresenter = carPresenter.presents(cars.data);
      const carResponse = { ...cars, data: carsPresenter };

      return res.status(200).json({ data: carResponse });
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Partial<ICar>>> {
    try {
      const car = req.res.locals.car as ICar;

      viewingService.create(car._id);

      const _carPresenter = await carPresenter.present(car);
      return res.status(200).json({ data: _carPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async viewCount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { carId, day } = req.params;

      const viewCount = await viewingService.countViewing(+day, carId);

      res.status(200).json({ data: { viewCount, day: +day } });
    } catch (e) {
      next(e);
    }
  }

  public async averagePrice(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<{ city: string; manufacture: string; avg: number }>> {
    try {
      const { manufacture, city } = req.params;

      const averagePrice = await carService.getAveragePriceByRegion(
        manufacture,
        city,
      );

      return res
        .status(200)
        .json({ data: { city, manufacture, avg: averagePrice } });
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { carId } = req.params;

      await carService.deleteById(carId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const { carId } = req.params;
      const body = req.body;

      const car = await carService.update(body, carId);

      const _carPresenter = await carPresenter.present(car);

      return res.status(201).json({ data: _carPresenter });
    } catch (e) {
      next(e);
    }
  }

  public async updatePhoto(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.res.locals.car as ICar;
      const file = req.files.avatar as UploadedFile;

      const car = await carService.updatePhoto(body, file);

      const _carPresenter = await carPresenter.present(car);

      res.status(201).json({ data: _carPresenter });
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
