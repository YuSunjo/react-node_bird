import ApiResponse from '@src/common/ApiResponse';
import { CreateSampleRequestDto } from '@src/services/sample/dto/sample.request.dto';
import { SampleResponseDto } from '@src/services/sample/dto/sample.response.dto';
import { SampleService } from '@src/services/sample/sample.service';
import { Body, Get, HttpCode, Controller, Post } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller()
export class SampleController {
  constructor(private sampleService: SampleService) {}

  @Get('/sample')
  @HttpCode(200)
  public async sample(): Promise<ApiResponse<SampleResponseDto>> {
    return ApiResponse.success(await this.sampleService.getAll());
  }

  @Post('/sample')
  @HttpCode(201)
  public async save(
    @Body() createSampleDto: CreateSampleRequestDto
  ): Promise<ApiResponse<string>> {
    await this.sampleService.save(createSampleDto);
    return ApiResponse.success('ok');
  }
}
