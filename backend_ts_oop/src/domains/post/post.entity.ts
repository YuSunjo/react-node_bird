import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from '../comment/commet.entity';
import { CoreEntity } from '../core.entity';
import { Image } from '../Image/image.entity';
import { Like } from '../like/like.entity';
import { Member } from '../member/member.entity';
import { PostHashtag } from '../postHashtag/postHashtag.entity';

@Entity()
export class Post extends CoreEntity {
  @Column('text')
  private content: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => PostHashtag, (postHashtag) => postHashtag.post)
  posthashtags: PostHashtag[];

  @ManyToOne(() => Member, (member) => member.posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  member: Member;

  @ManyToOne(() => Post, (post) => post.posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'retweetId', referencedColumnName: 'id' }])
  retweet: Post;

  @OneToMany(() => Post, (post) => post.retweet)
  posts: Post[];

  constructor(content: string) {
    super();
    this.content = content;
  }

  public getContent() {
    return this.content;
  }
}
