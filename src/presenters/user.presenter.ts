import { configs } from "../configs";
import { IUser } from "../interfaces";

class UserPresenter {
  public present(user: IUser): Partial<IUser> {
    return {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      status: user.status,
      premium: user.premium,
      avatar: user.avatar ? configs.AWS_S3_BUKET_URL + user.avatar : null,
    };
  }

  public async presents(users: IUser[]): Promise<Partial<IUser[]>> {
    const usersPresenter = users.map((user) => ({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      status: user.status,
      premium: user.premium,
      avatar: user.avatar ? configs.AWS_S3_BUKET_URL + user.avatar : null,
    }));

    return usersPresenter as Partial<IUser[]>;
  }
}

export const userPresenter = new UserPresenter();
