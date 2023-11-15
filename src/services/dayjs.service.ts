import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsService {
  public previousDay(day: number): Dayjs {
    return dayjs().utc().subtract(day, "d");
  }

  public previousMinutes(minutes: number): Dayjs {
    return dayjs().utc().subtract(minutes, "minutes");
  }

  public currentTime(): Dayjs {
    return dayjs().utc();
  }
}

export const dayjsService = new DayjsService();
