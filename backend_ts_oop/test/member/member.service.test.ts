import { Connection, Repository } from 'typeorm';
import setUpDataBase from '../utils/db.connection';
import { Member } from '../../src/domains/member/member.entity';
import { MemberService } from '../../src/services/member/member.service';
import { signUpUserRequestDto } from '../../src/services/dto/member.request.dto';

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
});
