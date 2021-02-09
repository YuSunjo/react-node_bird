import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Member } from '../member/member.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Like extends CoreEntity {
  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: number;

  @ManyToOne(() => Member, (member) => member.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  member: number;
}
