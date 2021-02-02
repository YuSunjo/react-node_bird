import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Body, JsonController, Post } from 'routing-controllers';
import { AuthorService } from '@src/services/author/author.service';
import { AuthorRegisterRequest } from '@src/services/author/dto/author.request.dto';
import ApiResponse from '@src/common/ApiResponse';
import { AuthorResponse } from '@src/services/author/dto/author.response.dto';

@Service()
@JsonController()
export default class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('/author')
  public async registerAuthor(@Body() request: AuthorRegisterRequest): Promise<ApiResponse<AuthorResponse>> {
    const response = await this.authorService.registerAuthor(request);
    return ApiResponse.success(response);
  }
}
