import bcrypt from "bcrypt";

import { configs } from "../configs";
import { ApiError } from "../errors";

class PasswordService {
  public async hash(password: string): Promise<string> {
    try {
      const saltRounds = configs.SECRET_SALT;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw new ApiError("Password hashing error", 500);
    }
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new ApiError("Password comparison error", 500);
    }
  }
}

export const passwordService = new PasswordService();
