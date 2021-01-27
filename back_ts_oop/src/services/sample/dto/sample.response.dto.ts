import { Sample } from '@src/domains/sample/sample.entity';

export class SampleResponseDto {
  id: number;
  title: string;
  count: number;

  constructor(id: number, title: string, count: number) {
    this.id = id;
    this.title = title;
    this.count = count;
  }

  static of(sample: Sample) {
    return new SampleResponseDto(sample.id, sample.title, sample.count);
  }
}
