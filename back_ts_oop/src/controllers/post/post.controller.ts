import ApiResponse from '@src/common/ApiResponse';
import User from '@src/domains/user/user.entity';
import { postRegisterRequest } from '@src/services/post/dto/post.request.dto';
import { PostResponse } from '@src/services/post/dto/post.response.dto';
import { PostService } from '@src/services/post/post.service';
import { Body, Controller, CurrentUser, Get, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/post')
  public async registerPost(
    @Body() request: postRegisterRequest,
    @CurrentUser() userId: User
  ): Promise<ApiResponse<PostResponse>> {
    const response = await this.postService.registerPost(request, userId);
    return ApiResponse.success(response);
  }

  @Get('/posts')
  public async getAll() {
    const response = await this.postService.getPosts();
    return ApiResponse.success(response);
  }
}
