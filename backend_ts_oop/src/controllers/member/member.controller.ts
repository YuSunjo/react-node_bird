import { ApiResponse } from '@src/common/dto/api.response.dto';
import { ChangeNicknameRequest, loginUserRequest, signUpUserRequestDto } from '@src/services/dto/member.request.dto';
import { ChangeNicknameResponse, LoginUserResponse } from '@src/services/dto/member.response.dto';
import { MemberService } from '@src/services/member/member.service';
import { Body, CurrentUser, Get, JsonController, Patch, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/user')
  public async getAll(@CurrentUser() memberId: number) {
    const response = await this.memberService.getMember(memberId);
    return ApiResponse.success(response);
  }

  @Post('/user')
  public async signUpUser(@Body() request: signUpUserRequestDto) {
    await this.memberService.signUpUser(request);
    return ApiResponse.success();
  }

  @Post('/user/login')
  public async loginUser(@Body() request: loginUserRequest): Promise<ApiResponse<LoginUserResponse>> {
    const response = await this.memberService.loginUser(request);
    return ApiResponse.success(response);
  }

  //Post logout

  @Patch('/user/nickname')
  public async changeNickname(
    @Body() request: ChangeNicknameRequest,
    @CurrentUser() memberId: number
  ): Promise<ApiResponse<ChangeNicknameResponse>> {
    const response = await this.memberService.changeNickname(request, memberId);
    return ApiResponse.success(response);
  }
}
