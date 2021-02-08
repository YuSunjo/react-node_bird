import Author from '@src/domains/Author/author.entity';
import Photo from '@src/domains/photo/photo.entity';
import PhotoToAuthor from '@src/domains/postToCategory/postToAuthor.entity';
import { IsString } from 'class-validator';

export class PhotoRegisterRequest {
  @IsString()
  private readonly src: string;

  constructor(src: string) {
    this.src = src;
  }

  public toEntity(authorId: number): Photo {
    return Photo.of(this.src, authorId);
  }

  public getSrc(): string {
    return this.src;
  }

  public toEntityPhotoAuthor(photoId: number, authorId: number): PhotoToAuthor {
    return PhotoToAuthor.of(photoId, authorId);
  }
}
