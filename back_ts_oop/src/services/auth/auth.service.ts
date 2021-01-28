import User from '@src/domains/user/user.entity';
import UserRepository from '@src/domains/user/user.repository';
import GoogleApiCaller from '@src/externals/googleApiCaller';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { GoogleAuthRequest, GoogleAuthResponse } from './dto/google.auth.dto';

@Service()
export default class AuthService {
  constructor(
    @InjectRepository() private readonly userRepository: UserRepository,
    @Inject() private readonly googleApiCaller: GoogleApiCaller
  ) {}

  public async handleGoogleService(request: GoogleAuthRequest) {
    const { email, name, picture } = await this.googleApiCaller.getGoogleUserProfile(
      request.getCode(),
      request.getRedirectUri()
    );
    const user = await this.userRepository.findGoogleUserByEmail(email);

    if (user) {
      //토큰 생성
      return GoogleAuthResponse.login('token');
    }
    const newUser = await this.userRepository.save(User.google(email, name, picture));

    return GoogleAuthResponse.signUp('token');
  }
}
