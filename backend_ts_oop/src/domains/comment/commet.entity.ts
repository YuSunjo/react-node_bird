import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Member } from '../member/member.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Comment extends CoreEntity {
  @Column('text')
  private content: string;

  @ManyToOne(() => Member, (member) => member.comments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  member: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: number;

  constructor(content: string) {
    super();
    this.content = content;
  }

  public getContent() {
    return this.content;
  }
}
