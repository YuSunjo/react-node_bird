import { ApiResponse } from '@src/common/dto/api.response.dto';
import { PostsService } from '@src/services/posts/posts.service';
import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async test() {
    return ApiResponse.success();
  }
}
