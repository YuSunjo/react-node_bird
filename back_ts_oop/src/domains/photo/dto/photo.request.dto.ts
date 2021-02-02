import Author from '@src/domains/Author/author.entity';
import Photo from '@src/domains/photo/photo.entity';
import { IsString } from 'class-validator';

export class PhotoRegisterRequest {
  @IsString()
  private readonly src: string;

  constructor(src: string) {
    this.src = src;
  }

  public toEntity(authorId: Author): Photo {
    return Photo.of(this.src, authorId);
  }

  public getSrc(): string {
    return this.src;
  }
}
