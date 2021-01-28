import { SampleRepository } from '@src/domains/sample/sample.repository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateSampleRequestDto } from '@src/services/sample/dto/sample.request.dto';
import { SampleResponseDto } from '@src/services/sample/dto/sample.response.dto';

@Service()
export class SampleService {
  constructor(@InjectRepository() private readonly sampleRepository: SampleRepository) {}

  public async getAll(): Promise<SampleResponseDto[]> {
    const findSamples = await this.sampleRepository.find();
    return findSamples.map((sample) => {
      return SampleResponseDto.of(sample);
    });
  }

  public async save(createSampleDto: CreateSampleRequestDto): Promise<void> {
    await this.sampleRepository.save(createSampleDto.toEntity());
  }
}
