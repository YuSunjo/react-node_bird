import AuthService from '@src/services/auth/auth.service';
import { GoogleAuthRequest } from '@src/services/auth/dto/google.auth.dto';
import { JsonController, Get, QueryParams, HttpCode } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/api/v1/auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Get('/google')
  public async handleGoogleAuth(@QueryParams() request: GoogleAuthRequest) {
    return this.authService.handleGoogleService(request);
  }
}
