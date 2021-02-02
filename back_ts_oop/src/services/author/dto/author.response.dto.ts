import BaseEntityResponse from '@src/common/base.response.dto';
import Author from '@src/domains/Author/author.entity';

export class AuthorResponse extends BaseEntityResponse {
  private readonly name: string;

  constructor(id: number, name: string, createdAt: Date, updatedAt: Date) {
    super(id, createdAt, updatedAt);
    this.name = name;
  }

  public static of(author: Author) {
    return new AuthorResponse(author.getId(), author.getName(), author.getCreatedAt(), author.getUpdatedAt());
  }

  public getName(): string {
    return this.name;
  }
}
