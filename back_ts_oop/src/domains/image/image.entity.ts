import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import Post from '../post/post.entity';

@Entity()
export default class Image extends AbstractBaseEntity {
  @Column({
    nullable: true,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  private src: string;

  @ManyToOne(() => Post, (post) => post.images)
  post: Post[];

  constructor(src: string) {
    super();
    this.src = src;
  }

  public static of(src: string): Image {
    return new Image(src);
  }

  public getSrc() {
    return this.src;
  }
}
