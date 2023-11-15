import { Response } from "express";
import { Types } from "mongoose";

import { EUserStatus } from "../enums";

export interface IUser {
  _id?: Types.ObjectId | IUser | string;
  name: string;
  phone: string;
  premium: boolean;
  status: EUserStatus;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserResponse = Promise<Response<Partial<IUser>>>;
export type IUsersResponse = Promise<Response<Partial<IUser[]>>>;
