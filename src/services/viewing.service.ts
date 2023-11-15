import { ApiError } from "../errors";
import { IViewing } from "../interfaces";
import { viewingRepository } from "../repositories";
import { dayjsService } from "./dayjs.service";

class ViewingService {
  public async create(carId: string): Promise<IViewing> {
    return await viewingRepository.create(carId);
  }

  public async countViewing(day: number, carId: string): Promise<number> {
    if (isNaN(day)) {
      throw new ApiError("Параметр 'day' повинен бути числом", 400);
    }

    const previousTime = dayjsService.previousDay(day);

    return await viewingRepository.viewCount(previousTime, carId);
  }
}

export const viewingService = new ViewingService();
