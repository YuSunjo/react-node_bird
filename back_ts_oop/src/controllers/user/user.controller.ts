import ApiResponse from '@src/common/ApiResponse';
import UserService from '@src/services/user/user.service';
import { Body, Get, HttpCode, Controller, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { signUpRequestDto } from '@src/services/user/dto/user.request.dto';

@Service()
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/user')
  public async signUp(@Body() sighupUser: signUpRequestDto): Promise<ApiResponse<string>> {
    await this.userService.signUp(sighupUser.getEmail(), sighupUser.getNickname(), sighupUser.getPassword());
    return ApiResponse.success('ok');
  }
}
