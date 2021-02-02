import BaseEntityResponse from '@src/common/base.response.dto';
import Post from '@src/domains/post/post.entity';

export class PostResponse extends BaseEntityResponse {
  private readonly content: string;
  private readonly userId;

  constructor(id: number, content: string, userId, createdAt: Date, updatedAt: Date) {
    super(id, createdAt, updatedAt);
    this.content = content;
    this.userId = userId;
  }

  public static of(post: Post) {
    return new PostResponse(
      post.getId(),
      post.getContent(),
      post.getUserId(),
      post.getCreatedAt(),
      post.getUpdatedAt()
    );
  }

  public getContent(): string {
    return this.content;
  }
}
