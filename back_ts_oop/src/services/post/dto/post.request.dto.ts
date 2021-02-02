import Post from '@src/domains/post/post.entity';
import User from '@src/domains/user/user.entity';
import { IsString } from 'class-validator';

export class postRegisterRequest {
  @IsString()
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }

  public toEntity(userId: User): Post {
    return Post.of(this.content, userId);
  }
}
