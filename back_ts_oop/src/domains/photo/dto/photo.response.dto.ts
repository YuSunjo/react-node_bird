import Photo from '@src/domains/photo/photo.entity';
import BaseEntityResponse from '@src/common/base.response.dto';
import Author from '@src/domains/Author/author.entity';

export class PhotoResponse extends BaseEntityResponse {
  private readonly src: string;

  constructor(id: number, src: string, createdAt: Date, updatedAt: Date) {
    super(id, createdAt, updatedAt);
    this.src = src;
  }

  public static of(photo: Photo) {
    return new PhotoResponse(photo.getId(), photo.getSrc(), photo.getCreatedAt(), photo.getUpdatedAt());
  }

  public getSrc(): string {
    return this.src;
  }
}

export class RetrievePhotoResponse extends BaseEntityResponse {
  private readonly src: string;
  private readonly author: Author;

  constructor(id: number, src: string, author: Author, createdAt: Date, updatedAt: Date) {
    super(id, createdAt, updatedAt);
    this.src = src;
    this.author = author;
  }

  public static of(photo: Photo) {
    return new RetrievePhotoResponse(
      photo.getId(),
      photo.getSrc(),
      photo.getAuthor(),
      photo.getCreatedAt(),
      photo.getUpdatedAt()
    );
  }

  public getSrc() {
    return this.src;
  }

  public getAuthor() {
    return this.author;
  }
}
