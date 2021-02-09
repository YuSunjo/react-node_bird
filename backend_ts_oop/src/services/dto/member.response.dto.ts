import { Member } from '@src/domains/member/member.entity';

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
