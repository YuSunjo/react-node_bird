import UserRepository from '@src/domains/user/user.repository';
import { NotFoundException } from '@src/exception/CustomException';

export default class userServiceUtils {
  public static async findUserByEmail(userRepository: UserRepository, email: string) {
    const exUser = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (!exUser) {
      throw new NotFoundException('존재하는 유저가 없습니다.');
    }
    return exUser;
  }

  public static async findUserById(userRepository: UserRepository, id: number) {
    const exUser = await userRepository.findOne({
      where: {
        id,
      },
    });
    if (!exUser) {
      return null;
    }
    return exUser;
  }
}
