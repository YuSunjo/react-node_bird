import { EntityRepository, Repository } from 'typeorm';
import { Member } from '@src/domains/member/member.entity';

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
  public async getFollower(memberId: number, limit: number) {
    return await this.find({
      join: {
        alias: 'followers',
      },
      where: {
        id: memberId,
      },
      take: limit,
    });
  }
  public async getFollowing(memberId: number, limit: number) {
    return await this.find({
      join: {
        alias: 'followers',
      },
      where: {
        id: memberId,
      },
      take: limit,
    });
  }
}
