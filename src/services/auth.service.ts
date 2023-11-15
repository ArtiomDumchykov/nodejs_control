import { EToken } from "../enums";
import { IToken, IUser } from "../interfaces";
import { tokenRepository } from "../repositories";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async register(dto: IUser): Promise<IUser> {
    const hashedPassword = await passwordService.hash(dto.password);

    const userDto = { ...dto, password: hashedPassword };

    return await userService.create(userDto);
  }

  public async login(dto: IUser): Promise<IToken> {
    const accessToken = tokenService.generateToken(
      { _userId: dto._id },
      EToken.ACCESS,
    );

    const refreshToken = tokenService.generateToken(
      { _userId: dto._id },
      EToken.REFRESH,
    );

    const tokens = {
      _userId: dto._id,
      accessToken,
      refreshToken,
    };

    return await tokenRepository.create(tokens);
  }
}

export const authService = new AuthService();
