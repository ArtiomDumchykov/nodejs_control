import { model, Schema, Types } from "mongoose";

import { IViewing } from "../interfaces";
import { User } from "./user.model";

const schema = new Schema(
  {
    carId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Viewing = model<IViewing>("viewing", schema);
