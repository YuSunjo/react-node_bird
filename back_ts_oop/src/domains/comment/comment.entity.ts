import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import User from '../user/user.entity';
import Post from '@src/domains/post/post.entity';

@Entity()
export default class Comment extends AbstractBaseEntity {
  @Column({
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  private content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  constructor(content: string) {
    super();
    this.content = content;
  }

  public static of(content: string): Comment {
    return new Comment(content);
  }

  public getContent() {
    return this.content;
  }
}
