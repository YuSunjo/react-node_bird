import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import Post from '@src/domains/post/post.entity';
import Comment from '@src/domains/comment/comment.entity';
import { UserProvider } from './user.type';

@Entity()
export default class User extends AbstractBaseEntity {
  @Column({
    unique: true,
    nullable: false,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  private email: string;

  @Column({
    nullable: false,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  private nickname: string;

  @Column({
    nullable: true,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  private password: string;

  @Column({ nullable: true })
  private profileUrl: string;

  @Column()
  private provider: UserProvider;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Post, (post) => post.liker)
  @JoinTable()
  liked: Post[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  follower: User[];

  @ManyToMany(() => User, (user) => user.follower)
  following: User[];

  constructor(email: string, nickname: string, password: string, profileUrl: string, provider: UserProvider) {
    super();
    this.email = email;
    this.nickname = nickname;
    this.password = password;
    this.profileUrl = profileUrl;
    this.provider = provider;
  }

  public static local(email: string, nickname: string, password: string): User {
    return new User(email, nickname, password, null, UserProvider.LOCAL);
  }

  public static google(email: string, nickname: string, profileUrl: string) {
    return new User(email, nickname, null, profileUrl, UserProvider.GOOGLE);
  }

  public getEmail() {
    return this.email;
  }
  public getNickname() {
    return this.nickname;
  }
  public getPassword() {
    return this.password;
  }
  public getProfileUrl() {
    return this.profileUrl;
  }
}
