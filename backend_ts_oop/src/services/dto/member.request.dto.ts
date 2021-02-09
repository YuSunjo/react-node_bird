import { Member } from '@src/domains/member/member.entity';
import { IsEmail, IsString } from 'class-validator';

export class signUpUserRequestDto {
  @IsEmail({}, { message: '이메일을 다시 확인해주세요' })
  private readonly email: string;

  @IsString({ message: '닉네임을 다시 확인해주세요.' })
  private readonly nickname: string;

  @IsString({ message: '비밀번호를 다시 확인해주세요' })
  private readonly password: string;

  constructor(email: string, nickname: string, password: string) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }
  public toSignupEntity(hashedPassword: string): Member {
    return Member.of(this.email, this.nickname, hashedPassword);
  }

  public toEntity(): Member {
    return Member.of(this.email, this.nickname, this.password);
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getNickname() {
    return this.nickname;
  }
}

export class loginUserRequest {
  @IsEmail({}, { message: '이메일을 다시 확인해주세요' })
  private readonly email: string;

  @IsString({ message: '비밀번호를 확인해주세요' })
  private readonly password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }
}

export class ChangeNicknameRequest {
  @IsString({ message: '닉네임을 확인해주세요' })
  private readonly nickname: string;

  constructor(nickname: string) {
    this.nickname = nickname;
  }

  public getNickname() {
    return this.nickname;
  }
}
