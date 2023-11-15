import { Document, Types } from "mongoose";

import { IUser } from "./user.interface";

export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  _userId: Types.ObjectId | IUser | string;
}

export type ITokenPayload = Pick<IToken, "_userId">;

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
