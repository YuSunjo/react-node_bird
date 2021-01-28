import { BadGateWayException } from '@src/exception/CustomException';
import axios from 'axios';
import { Service } from 'typedi';

@Service()
export default class GoogleApiCaller {
  public async getGoogleUserProfile(code: string, redirectUri: string) {
    try {
      const accessToken = await this.getGoogleAccessToken(code, redirectUri);
      const profileInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken.data.access_token}`
      );
      return profileInfo.data;
    } catch (error) {
      throw new BadGateWayException('구글 로그인 중 에러가 발생하였습니다.');
    }
  }

  private async getGoogleAccessToken(code: string, redirectUri: string) {
    return await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: process.env.GOOGLE_GRANT_TYPE,
      redirect_uri: redirectUri,
      code: code,
    });
  }
}
