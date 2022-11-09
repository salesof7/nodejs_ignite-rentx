import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";
import {} from "class-transformer";

class UserMap {
  static async toDTO(user: User): Promise<IUserResponseDTO> {
    const userData = Object.assign(
      {},
      {
        ...user,
        avatar_url: user.avatar_url(),
        password: undefined,
        email: undefined,
        isAdmin: undefined,
        created_at: undefined,
      }
    );

    return userData;
  }
}

export { UserMap };
