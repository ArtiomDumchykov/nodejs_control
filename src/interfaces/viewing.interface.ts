import { Types } from "mongoose";

import { ICar } from "./car.interface";

export interface IViewing extends Document {
  carId: string | ICar | Types.ObjectId;
}
