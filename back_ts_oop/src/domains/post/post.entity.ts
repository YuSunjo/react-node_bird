import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import User from '../user/user.entity';
import Comment from '@src/domains/comment/comment.entity';
import Image from '../image/image.entity';
import Hashtag from '../hashtag/hashtag.entity';

@Entity()
export default class Post extends AbstractBaseEntity {
  @Column({
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  private content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => User, (user) => user.liked, {
    cascade: true,
  })
  liker: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.post, {
    cascade: true,
  })
  @JoinTable()
  hashtag: Hashtag[];

  @OneToMany(() => Post, (post) => post.retweet)
  post: Post[];

  @ManyToOne(() => Post, (post) => post.post)
  retweet: Post[];

  constructor(content: string) {
    super();
    this.content = content;
  }

  public static of(content: string): Post {
    return new Post(content);
  }

  public getContent() {
    return this.content;
  }
}
