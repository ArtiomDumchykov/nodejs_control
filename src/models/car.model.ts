import { model, Schema, Types } from "mongoose";

import { ICar } from "../interfaces";
import { User } from "./user.model";

const schema = new Schema(
  {
    model: {
      type: String,
    },
    photo: {
      type: String,
      default: null,
    },
    year: {
      type: String,
    },

    manufacture: {
      type: String,
    },

    price: {
      type: Number,
    },
    currency: {
      type: String,
    },
    city: {
      type: String,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false, timestamps: true },
);

export const Car = model<ICar>("cars", schema);
