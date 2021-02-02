import User from '@src/domains/user/user.entity';
import BaseEntityResponse from '@src/common/base.response.dto';
import { IsNumber, IsString } from 'class-validator';

export default class WithoutPassword extends BaseEntityResponse {
  @IsString()
  private readonly email: string;

  @IsString()
  private readonly nickname: string;

  @IsNumber()
  private readonly postId: number;

  @IsNumber()
  private readonly followingId: number;

  @IsNumber()
  private readonly followerId: number;

  constructor(
    id: number,
    email: string,
    nickname: string,
    postId: number,
    followingId: number,
    followerId: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
    this.email = email;
    this.nickname = nickname;
    this.postId = postId;
    this.followingId = followingId;
    this.followerId = followerId;
  }
}
