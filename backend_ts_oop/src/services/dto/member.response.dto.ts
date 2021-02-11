import { Follow } from '@src/domains/follow/follow.entity';
import { Member } from '@src/domains/member/member.entity';
import { Post } from '@src/domains/post/post.entity';

export class LoginUserResponse {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public static login(token: string) {
    return new LoginUserResponse(token);
  }
}

export class ChangeNicknameResponse {
  private readonly nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }

  public static of(member: Member) {
    return new ChangeNicknameResponse(member.getNickname());
  }

  public getNickname() {
    return this.nickname;
  }
}

export class FullMemberWithoutPassword {
  private readonly email: string;
  private readonly nickname: string;
  private readonly posts: Post[];
  private readonly followings: Follow[];
  private readonly followers: Follow[];

  constructor(email: string, nickname: string, posts: Post[], followings: Follow[], followers: Follow[]) {
    this.email = email;
    this.nickname = nickname;
    this.posts = posts;
    this.followings = followings;
    this.followers = followers;
  }

  public static of(member: Member) {
    return new FullMemberWithoutPassword(
      member.getEmail(),
      member.getNickname(),
      member.posts,
      member.followings,
      member.followers
    );
  }

  public getEmail() {
    return this.email;
  }

  public getNickname() {
    return this.nickname;
  }

  public getPosts() {
    return this.posts;
  }

  public getFollowers() {
    return this.followers;
  }

  public getFollowings() {
    return this.followings;
  }
}

export class FollowersResponse {
  private readonly followers: Follow[];

  constructor(followers: Follow[]) {
    this.followers = followers;
  }

  public static of(member: Member) {
    return new FollowersResponse(member.followers);
  }
}

export class FollowingsResponse {
  private readonly followings: Follow[];

  constructor(followings: Follow[]) {
    this.followings = followings;
  }

  public static of(member: Member) {
    return new FollowingsResponse(member.followings);
  }
}
