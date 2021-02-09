import { NotFoundException } from '@src/common/exceptions/custom.exception';
import bcrypt from 'bcrypt';

export class PasswordUtils {
  public static encodePassword(password: string) {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  }

  public static comparePassword(password: string, hashedPassword: string) {
    const comparePassword = bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      throw new NotFoundException('비밀번호가 틀렸습니다.');
    }
    return comparePassword;
  }
}
