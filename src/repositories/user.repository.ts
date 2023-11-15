import { FilterQuery } from "mongoose";

import { IPaginationResponse, IQuery, IUser } from "../interfaces";
import { User } from "../models";

class UserRepository {
  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async getOneByParams(dto: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(dto);
  }

  public async update(dto: FilterQuery<IUser>, userId: string): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async getAll(query: IQuery): Promise<IPaginationResponse<IUser>> {
    const { page = 1, limit = 5, sortedBy, ...searchObj } = query;
    const skip = +limit * (+page - 1);

    const [data, itemsFound] = await Promise.all([
      User.find(searchObj).skip(+skip).limit(+limit).sort(sortedBy),
      User.count(searchObj),
    ]);

    return { page, limit, itemsFound, data };
  }

  public async delete(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
