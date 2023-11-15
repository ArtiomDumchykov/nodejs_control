import { Dayjs } from "dayjs";
import { FilterQuery } from "mongoose";

import { ECarStatus } from "../enums";
import { ICar, IPaginationResponse, IQuery } from "../interfaces";
import { Car } from "../models";
import { dayjsService } from "../services";

class CarRepository {
  public async create(data: ICar, _userId: string): Promise<ICar> {
    return await Car.create({ ...data, _userId });
  }

  public async getAll(
    query: IQuery,
    status: ECarStatus,
  ): Promise<IPaginationResponse<ICar>> {
    const { page = 1, limit = 5, sortedBy, ...obj } = query;
    const searchObj = { ...obj, status };
    const skip = +limit * (+page - 1);

    const [data, itemsFound] = await Promise.all([
      Car.find(searchObj).skip(+skip).limit(+limit).sort(sortedBy),
      Car.count(searchObj),
    ]);

    return { page, limit, itemsFound, data };
  }

  public async deleteById(carId: string): Promise<void> {
    await Car.deleteOne({ _id: carId });
  }

  public async update(data: FilterQuery<ICar>, carId: string): Promise<ICar> {
    return await Car.findOneAndUpdate({ _id: carId }, data, {
      returnDocument: "after",
    }).lean();
  }

  public async getFindById(carId: string): Promise<ICar> {
    return await Car.findById(carId).lean();
  }

  public async getFindByParams(carId: string, userId: string): Promise<ICar> {
    return await Car.findOne({ _id: carId, _userId: userId });
  }

  public async getFindCountCarById(userId: string): Promise<number> {
    return await Car.count({ _userId: userId });
  }

  public async getCountCarByData(
    previousTime: Dayjs,
    _userId: string,
    status: ECarStatus,
  ): Promise<number> {
    const currentTime = dayjsService.currentTime();
    const createdAt = { $gte: previousTime, $lte: currentTime };
    const countCarParams = { createdAt, _userId, status };
    return await Car.count(countCarParams);
  }

  public async getAveragePriceByRegion(
    manufacture: string,
    city: string,
  ): Promise<number> {
    const cityOrAllUkraine = city === "all" ? {} : { city };
    const [averagePriceByRegion] = await Promise.all([
      Car.aggregate([
        {
          $match: { $and: [{ ...cityOrAllUkraine }, { manufacture }] },
        },
        {
          $group: {
            _id: "$city",
            averagePrice: { $avg: "$price" },
          },
        },
      ]),
    ]);

    return averagePriceByRegion.length > 0
      ? averagePriceByRegion[0].averagePrice
      : 0;
  }

  public async deleteAllByParams(data: FilterQuery<ICar>): Promise<void> {
    await Car.deleteMany(data);
  }
}

export const carRepository = new CarRepository();
