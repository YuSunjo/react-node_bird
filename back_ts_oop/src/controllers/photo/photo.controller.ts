import { Service } from 'typedi';
import { Body, Controller, Get, Param, Post } from 'routing-controllers';
import { PhotoService } from '@src/services/photo/photo.service';
import { PhotoRegisterRequest } from '@src/domains/photo/dto/photo.request.dto';
import ApiResponse from '@src/common/ApiResponse';
import Author from '@src/domains/Author/author.entity';

@Service()
@Controller()
export default class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('/photo/:authorId')
  public async registerPhoto(@Body() request: PhotoRegisterRequest, @Param('authorId') authorId: Author) {
    const response = await this.photoService.registerPhoto(request, authorId);
    return ApiResponse.success(response);
  }

  @Get('/photo/:authorId')
  public async getPhoto(@Param('authorId') authorId: number) {
    const response = await this.photoService.retrievePhoto(authorId);
    return ApiResponse.success(response);
  }
}
