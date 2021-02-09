import { ApiResponse } from '@src/common/dto/api.response.dto';
import { PostService } from '@src/services/post/post.service';
import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async test() {
    return ApiResponse.success();
  }
}
