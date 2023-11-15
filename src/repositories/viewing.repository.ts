import { Dayjs } from "dayjs";

import { IViewing } from "../interfaces";
import { Viewing } from "../models";
import { dayjsService } from "../services";

class ViewingRepository {
  public async create(carId: string): Promise<IViewing> {
    return await Viewing.create({ carId });
  }

  public async viewCount(previousTime: Dayjs, carId: string): Promise<number> {
    const currentTime = dayjsService.currentTime();

    return await Viewing.count({
      createdAt: { $gte: previousTime, $lte: currentTime },
      carId,
    });
  }
}

export const viewingRepository = new ViewingRepository();
