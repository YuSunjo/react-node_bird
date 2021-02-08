import { Column, Entity, ManyToOne } from 'typeorm';
import Photo from '@src/domains/photo/photo.entity';
import Author from '@src/domains/Author/author.entity';
import AbstractBaseEntity from '@src/domains/base.entity';

@Entity()
export default class PhotoToAuthor extends AbstractBaseEntity {
  @Column()
  private photoId: number;

  @Column()
  private authorId: number;

  @ManyToOne(() => Photo, (photo) => photo.photoToAuthor)
  photo: Photo;

  @ManyToOne(() => Author, (author) => author.photoToAuthor)
  author: Author;

  constructor(photoId: number, authorId: number) {
    super();
    this.photoId = photoId;
    this.authorId = authorId;
  }

  public static of(photoId: number, authorId: number) {
    return new PhotoToAuthor(photoId, authorId);
  }

  public getPhotoId() {
    return this.photoId;
  }

  public getAuthorId() {
    return this.authorId;
  }
}
