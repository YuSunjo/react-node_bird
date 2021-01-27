import { Controller, Get, HttpCode } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller()
export class MainController {
  @HttpCode(200)
  @Get('/ping')
  public ping() {
    return 'pong';
  }
}
