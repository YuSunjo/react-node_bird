import { Member } from '@src/domains/member/member.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import bcrypt from 'bcrypt';
import { ChangeNicknameRequest, loginUserRequest, signUpUserRequestDto } from '../dto/member.request.dto';
import { NotFoundException } from '@src/common/exceptions/custom.exception';
import { MemberServiceUtils } from './member.service.utils';
import { JwtTokenUtils } from '@src/common/utils/jwt/jwt.utils';
import {
  ChangeNicknameResponse,
  FollowersResponse,
  FollowingsResponse,
  FullMemberWithoutPassword,
  LoginUserResponse,
} from '../dto/member.response.dto';
import { PasswordUtils } from '@src/common/utils/password/password.utils';
import { MemberRepository } from '@src/domains/member/member.repository';

@Service()
export class MemberService {
  constructor(@InjectRepository(Member) private readonly memberRepository: MemberRepository) {}

  public async getMember(memberId: number) {
    const fullUserWithoutPassword = await this.memberRepository.findOne({
      relations: ['posts', 'followings', 'followers'],
      where: { id: memberId },
    });
    return FullMemberWithoutPassword.of(fullUserWithoutPassword);
  }

  public async signUpUser(request: signUpUserRequestDto): Promise<void> {
    const exUser = await this.memberRepository.findOne({
      where: {
        email: request.getEmail(),
      },
    });
    if (exUser) {
      throw new NotFoundException('이미 사용중인 아이디 입니다.');
    }
    const hashedPassword = await PasswordUtils.encodePassword(request.getPassword());
    const member = Member.login(request.getEmail(), request.getNickname(), hashedPassword);
    await this.memberRepository.save(member);
  }

  public async loginUser(request: loginUserRequest): Promise<LoginUserResponse> {
    const findEmail = await MemberServiceUtils.findMemberByEmail(this.memberRepository, request.getEmail());
    const result = await PasswordUtils.comparePassword(request.getPassword(), findEmail.getPassword());
    if (!result) {
      throw new NotFoundException('비밀번호가 틀렸습니다.');
    }
    const token = JwtTokenUtils.encodeToken(findEmail.getId());
    return LoginUserResponse.login(token);
  }

  public async changeNickname(request: ChangeNicknameRequest, memberId: number): Promise<ChangeNicknameResponse> {
    const findMember = await MemberServiceUtils.findMemberById(this.memberRepository, memberId);
    findMember.update(request.getNickname());
    await this.memberRepository.save(findMember);
    return ChangeNicknameResponse.of(findMember);
  }

  public async userFollower(memberId: number, limit: number) {
    const findMember = await MemberServiceUtils.findMemberById(this.memberRepository, memberId);
    const followers = await this.memberRepository.getFollower(memberId, limit);
    return followers.map((follower) => {
      return FollowersResponse.of(follower);
    });
  }

  public async userFollowing(memberId: number, limit: number) {
    await MemberServiceUtils.findMemberById(this.memberRepository, memberId);
    const followings = await this.memberRepository.getFollowing(memberId, limit);
    return followings.map((following) => {
      return FollowingsResponse.of(following);
    });
  }

  public async getMemberOne(memberId: number) {
    const fullMemberWithoutPassword = await this.memberRepository.findOne({
      relations: ['posts', 'followings', 'followers'],
      where: { id: memberId },
    });
    return FullMemberWithoutPassword.of(fullMemberWithoutPassword);
  }
}
