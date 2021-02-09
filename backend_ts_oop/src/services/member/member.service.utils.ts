import { NotFoundException } from '@src/common/exceptions/custom.exception';
import { Member } from '@src/domains/member/member.entity';
import { Repository } from 'typeorm';

export class MemberServiceUtils {
  public static async findMemberByEmail(memberRepository: Repository<Member>, email: string) {
    const findMember = await memberRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!email) {
      throw new NotFoundException('해당 이메일이 존재하지 않습니다.');
    }
    return findMember;
  }

  public static async findMemberById(memberRepository: Repository<Member>, memberId: number) {
    const findMember = await memberRepository.findOne(memberId);
    if (!findMember) {
      throw new NotFoundException('존재하는 유저가 없습니다.');
    }
    return findMember;
  }
}
