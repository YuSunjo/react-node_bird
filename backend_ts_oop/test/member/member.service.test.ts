import { Connection, Repository } from 'typeorm';
import setUpDataBase from '../utils/db.connection';
import { Member } from '../../src/domains/member/member.entity';
import { MemberService } from '../../src/services/member/member.service';
import { loginUserRequest, signUpUserRequestDto } from '../../src/services/dto/member.request.dto';
import { MemberCreator } from '../../src/domains/member/member.creator';
import { PasswordUtils } from '../../src/common/utils/password/password.utils';

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

  describe('로그인 요청', () => {
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
});
