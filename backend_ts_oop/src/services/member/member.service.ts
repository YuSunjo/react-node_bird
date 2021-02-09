import { Member } from '@src/domains/member/member.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import bcrypt from 'bcrypt';
import { signUpUserRequestDto } from '../dto/member.request.dto';
import { NotFoundException } from '@src/common/exceptions/custom.exception';

@Service()
export class MemberService {
  constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {}

  public async signUpUser(request: signUpUserRequestDto): Promise<void> {
    const exUser = await this.memberRepository.findOne({
      where: {
        email: request.getEmail(),
      },
    });
    if (exUser) {
      throw new NotFoundException('이미 사용중인 아이디 입니다.');
    }
    const hashedPassword = await bcrypt.hash(request.getPassword(), 10);
    const member = Member.login(request.getEmail(), request.getNickname(), hashedPassword);
    await this.memberRepository.save(member);
  }
}
