import { Sample } from '@src/domains/sample/sample.entity';
import { IsNumber, IsString } from 'class-validator';
export class CreateSampleDto {
  @IsString()
  title: string;

  @IsNumber()
  count: number;

  toEntity() {
    return new Sample(this.title, this.count);
  }
}
