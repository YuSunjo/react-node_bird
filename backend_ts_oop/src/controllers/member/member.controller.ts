import { ApiResponse } from '@src/common/dto/api.response.dto';
import { ChangeNicknameRequest, loginUserRequest, signUpUserRequestDto } from '@src/services/dto/member.request.dto';
import { ChangeNicknameResponse, LoginUserResponse } from '@src/services/dto/member.response.dto';
import { MemberService } from '@src/services/member/member.service';
import { Body, CurrentUser, Get, JsonController, Param, Patch, Post, QueryParam } from 'routing-controllers';
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

  @Get('/user/followers')
  public async userFollower(@CurrentUser() memberId: number, @QueryParam('limit') limit: number) {
    const response = await this.memberService.userFollower(memberId, limit);
    return ApiResponse.success(response);
  }

  @Get('/user/followings')
  public async userFollowing(@CurrentUser() memberId: number, @QueryParam('limit') limit: number) {
    const response = await this.memberService.userFollowing(memberId, limit);
    return ApiResponse.success(response);
  }

  @Get('/user/:memberId')
  public async getMember(@Param('memberId') memberId: number) {
    const response = await this.memberService.getMemberOne(memberId);
    return ApiResponse.success(response);
  }
}
