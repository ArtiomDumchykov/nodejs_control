import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";

import { EFileType } from "../enums";
import { IPaginationResponse, IQuery, IUser } from "../interfaces";
import { userRepository } from "../repositories";
import { s3Service } from "./s3.service";

class UserService {
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await userRepository.getOneByParams(params);
  }

  public async getAll(query: IQuery): Promise<IPaginationResponse<IUser>> {
    return await userRepository.getAll(query);
  }

  public async findOneById(userId: string): Promise<IUser> {
    return await userRepository.getOneByParams({ _id: userId });
  }

  public async create(dto: IUser): Promise<IUser> {
    return await userRepository.create(dto);
  }

  public async update(dto: FilterQuery<IUser>, userId: string): Promise<IUser> {
    return await userRepository.update(dto, userId);
  }

  public async updateAvatar(dto: IUser, file: UploadedFile): Promise<IUser> {
    if (dto.avatar) {
      await s3Service.deleteFile(dto.avatar);
    }

    const fileKey = await s3Service.uploadFile(
      file,
      String(dto._id),
      EFileType.USERS,
    );

    return await userRepository.update({ avatar: fileKey }, String(dto._id));
  }

  public async delete(userId: string): Promise<void> {
    await userRepository.delete(userId);
  }
}

export const userService = new UserService();
