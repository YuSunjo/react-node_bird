import { ApiResponse } from '@src/common/dto/api.response.dto';
import { loginUserRequest, signUpUserRequestDto } from '@src/services/dto/member.request.dto';
import { LoginUserResponse } from '@src/services/dto/member.response.dto';
import { MemberService } from '@src/services/member/member.service';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/user')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/api/v1')
  public async test() {
    return ApiResponse.success();
  }

  @Post('/')
  public async signUpUser(@Body() request: signUpUserRequestDto) {
    await this.memberService.signUpUser(request);
    return ApiResponse.success();
  }

  @Post('/user/login')
  public async loginUser(@Body() request: loginUserRequest): Promise<ApiResponse<LoginUserResponse>> {
    const response = await this.memberService.loginUser(request);
    return ApiResponse.success(response);
  }
}
