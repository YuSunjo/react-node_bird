import UserRepository from '@src/domains/user/user.repository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import userServiceUtils from './user.service.util';
import bcrypt from 'bcrypt';
import User from '@src/domains/user/user.entity';

@Service()
export default class UserService {
  constructor(@InjectRepository() private readonly userRepository: UserRepository) {}

  public async signUp(email: string, nickname: string, password: string) {
    const findEmail = await userServiceUtils.findUserByEmail(this.userRepository, email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.local(email, nickname, hashedPassword);
    await this.userRepository.save(user);
  }

  public async getUser(userId: number) {
    const user = userServiceUtils.findUserById(this.userRepository, userId);
    //유저의 포스트, 댓글들 ... 이런거
  }
}
