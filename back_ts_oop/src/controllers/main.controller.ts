import ApiResponse from '@src/common/ApiResponse';
import { Controller, Get, HttpCode, NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller()
export class MainController {
  @HttpCode(200)
  @Get('/ping')
  public pint(): ApiResponse<string> {
    return ApiResponse.success('pong');
  }

  @Get('/404')
  public async errorTest() {
    throw new NotFoundError('Not found exception test');
  }
}
