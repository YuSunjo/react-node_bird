import Author from '@src/domains/Author/author.entity';
import { IsString } from 'class-validator';

export class AuthorRegisterRequest {
  @IsString()
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public toEntity(): Author {
    return Author.of(this.name);
  }
}
