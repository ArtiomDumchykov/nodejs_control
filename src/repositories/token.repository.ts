import { FilterQuery } from "mongoose";

import { IToken } from "../interfaces";
import { Token } from "../models";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findOne(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteOne(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

  public async deleteByParams(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteMany(params);
  }

  public async deleteManyByUserId(userId: string): Promise<void> {
    await Token.deleteMany({ _userId: userId });
  }
}

export const tokenRepository = new TokenRepository();
