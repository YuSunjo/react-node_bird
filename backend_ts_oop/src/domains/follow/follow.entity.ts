import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Member } from '../member/member.entity';

@Entity()
export class Follow extends CoreEntity {
  @ManyToOne(() => Member, (member) => member.followings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'followingId', referencedColumnName: 'id' }])
  following: number;

  @ManyToOne(() => Member, (member) => member.followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'followerId', referencedColumnName: 'id' }])
  follower: number;
}
