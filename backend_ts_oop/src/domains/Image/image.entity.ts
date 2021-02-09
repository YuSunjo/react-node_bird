import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Image extends CoreEntity {
  @Column()
  private src: string;

  @ManyToOne(() => Post, (post) => post.images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: number;

  constructor(src: string) {
    super();
    this.src = src;
  }

  public getSrc() {
    return this.src;
  }
}
