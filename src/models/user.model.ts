import { model, Schema } from "mongoose";

import { regexConstant } from "../constans";
import { IUser } from "../interfaces";

const personSchema = new Schema(
  {
    name: {
      type: String,
    },

    phone: {
      type: String,
    },

    status: {
      type: String,
      default: "buyer",
    },

    premium: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: regexConstant.EMAIL,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

export const User = model<IUser>("user", personSchema);
