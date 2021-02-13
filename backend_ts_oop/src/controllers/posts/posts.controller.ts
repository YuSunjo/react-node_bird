import { ApiResponse } from '@src/common/dto/api.response.dto';
import { PostsService } from '@src/services/posts/posts.service';
import { Get, JsonController, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  public async retrievePosts(@QueryParam('lastId') lastId: number) {
    const response = await this.postsService.retrievePosts(lastId);
    return ApiResponse.success(response);
  }
}
