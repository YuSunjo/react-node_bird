import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';
import { UserProvider } from './user.type';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findGoogleUserByEmail(email: string) {
    return await this.findOne({ where: { email, provider: UserProvider.GOOGLE } });
  }

  public async findUserWithoutPassword(id: number) {
    return await this.findOne({
      where: {id},
      
    })
  }
}
