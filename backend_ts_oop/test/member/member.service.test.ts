import { Connection, Repository } from 'typeorm';
import setUpDataBase from '../utils/db.connection';
import { Member } from '../../src/domains/member/member.entity';
import { MemberService } from '../../src/services/member/member.service';
import {
  ChangeNicknameRequest,
  loginUserRequest,
  signUpUserRequestDto,
} from '../../src/services/dto/member.request.dto';
import { MemberCreator } from '../../src/domains/member/member.creator';
import { PasswordUtils } from '../../src/common/utils/password/password.utils';
import { NotFoundException } from '../../src/common/exceptions/custom.exception';
import { BaseException } from '../../src/common/exceptions/base.exception';

describe('MemberServiceTest', () => {
  let connection: Connection;
  let memberRepository: Repository<Member>;
  let memberService: MemberService;

  beforeEach(async () => {
    connection = await setUpDataBase();
    memberRepository = connection.getRepository(Member);
    memberService = new MemberService(memberRepository);
  });

  afterEach(() => {
    connection.close();
  });

  describe('signup', () => {
    test('회원가입 요청을 하면 db에 저장됨', async () => {
      //given
      const email = 'tnswh2023@naver.com';
      const nickname = 'tnswh';
      const password = '123456';

      //when
      await memberService.signUpUser(new signUpUserRequestDto(email, nickname, password));

      //then
      const member = await memberRepository.find();
      expect(member.length).toBe(1);
      expect(member[0].getEmail()).toBe(email);
      expect(member[0].getNickname()).toBe(nickname);
    });
  });

  describe('loginUser', () => {
    test('로그인 성공시 토크을 반환한다.', async () => {
      //given
      const email = 'tnswh2023@naver.com';
      const password = 'password';
      const hashedPassword = await PasswordUtils.encodePassword(password);

      await memberRepository.save(MemberCreator.testInstance(email, 'tnswh', hashedPassword));

      //when    swagger로 로그인하면 되는데 왜 안되는거여?
      const response = await memberService.loginUser(new loginUserRequest(email, password));

      //then
      expect(response).not.toBeNull();
    });
  });

  describe('changeNickname', () => {
    test('회원정보 수정', async () => {
      //given
      const member = await memberRepository.save(Member.of('tnswh2023@naver.com', 'tnswh', 'password'));

      const updateNickname = '변경 후 닉네임';

      //when
      await memberService.changeNickname(new ChangeNicknameRequest(updateNickname), member.getId());

      //then
      const findMember = await memberRepository.find();
      expect(findMember.length).toBe(1);
      expect(findMember[0].getNickname()).toBe(updateNickname);
    });

    test('해당하는 유저가 없을 경우', async () => {
      try {
        await memberService.changeNickname(new ChangeNicknameRequest('tnswh'), 999);
      } catch (error) {
        expect(error).toBeInstanceOf(BaseException);
        expect(error.httpCode).toBe(404);
        expect(error.name).toBe('NOT_FOUND_EXCEPTION');
      }
    });
  });
});
