import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from '../comment/commet.entity';
import { CoreEntity } from '../core.entity';
import { Follow } from '../follow/follow.entity';
import { Like } from '../like/like.entity';
import { Post } from '../post/post.entity';

@Entity()
export class Member extends CoreEntity {
  @Column({ unique: true })
  private email: string;

  @Column()
  private nickname: string;

  @Column()
  private password: string;

  @OneToMany((type) => Post, (post) => post.member)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.member)
  comments: Comment[];

  @OneToMany((type) => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany((type) => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany((type) => Like, (like) => like.member)
  likes: Like[];

  constructor(email: string, nickname: string, password: string) {
    super();
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }

  public static login(email: string, nickname: string, password: string): Member {
    return new Member(email, nickname, password);
  }

  public static of(email: string, nickname: string, password: string): Member {
    return new Member(email, nickname, password);
  }

  public getEmail(): string {
    return this.email;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getPassword(): string {
    return this.password;
  }

  public update(nickname: string) {
    if (nickname) {
      this.nickname = nickname;
    }
  }
}
