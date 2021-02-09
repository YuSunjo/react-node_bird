import { Member } from '@src/domains/member/member.entity';
import { NotFoundError } from 'routing-controllers';
import { Repository } from 'typeorm';

export class MemberServiceUtils {
  public static async findMemberByEmail(memberRepository: Repository<Member>, email: string) {
    const findMember = await memberRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!email) {
      throw new NotFoundError('해당 이메일이 존재하지 않습니다.');
    }
    return findMember;
  }
}
