import User from '@src/domains/user/user.entity';
import { IsString } from 'class-validator';

export class signUpRequestDto {
  @IsString()
  private email: string;

  @IsString()
  private nickname: string;

  @IsString()
  private password: string;

  constructor(email: string, nickname: string, password: string) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
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
}
