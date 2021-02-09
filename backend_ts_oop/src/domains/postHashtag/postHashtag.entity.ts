import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Post } from '../post/post.entity';

@Entity()
export class PostHashtag extends CoreEntity {
  @ManyToOne(() => Hashtag, (hashtag) => hashtag.posthashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'hashtagId', referencedColumnName: 'id' }])
  hashtag: number;

  @ManyToOne(() => Post, (post) => post.posthashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: number;
}
