import { ApiResponse } from '@src/common/dto/api.response.dto';
import { HashtagService } from '@src/services/hashtag/hashtag.service';
import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get()
  public async test() {
    return ApiResponse.success();
  }
}
