import { Member } from './member.entity';

export class MemberCreator {
  public static testInstance(email: string, nickname: string = 'sunjo', password: string) {
    return new Member(email, nickname, password);
  }
}
