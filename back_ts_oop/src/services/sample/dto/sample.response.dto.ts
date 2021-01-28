// import Sample from '@src/domains/sample/sample.entity';
import BaseEntityResponse from '@src/common/base.response.dto';
import Sample from '@src/domains/sample/sample.entity';

export class SampleResponseDto extends BaseEntityResponse {
  name: string;
  description: string;

  constructor(id: number, name: string, description: string, createdAt: Date, updateAt: Date) {
    super(id, createdAt, updateAt);
    this.name = name;
    this.description = description;
  }

  static of(sample: Sample) {
    return new SampleResponseDto(
      sample.getId(),
      sample.getName(),
      sample.getDescription(),
      sample.getCreatedAt(),
      sample.getUpdatedAt()
    );
  }
}
