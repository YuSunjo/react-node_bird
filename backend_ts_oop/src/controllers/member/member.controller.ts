import { ApiResponse } from '@src/common/dto/api.response.dto';
import { MemberService } from '@src/services/member/member.service';
import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/api/v1')
  public async test() {
    return ApiResponse.success();
  }
}
