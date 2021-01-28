import Sample from '@src/domains/sample/sample.entity';
import { IsNumber, IsString } from 'class-validator';
export class CreateSampleRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  toEntity() {
    return new Sample(this.name, this.description);
  }
}
