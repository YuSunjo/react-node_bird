import { IsString } from 'class-validator';

export class GoogleAuthRequest {
  @IsString()
  private code: string;

  @IsString()
  private redirectUri: string;

  public getCode() {
    return this.code;
  }

  public getRedirectUri() {
    return this.redirectUri;
  }
}

export class GoogleAuthResponse {
  private isNew: boolean;
  private token: string;

  constructor(isNew: boolean, token: string) {
    this.isNew = isNew;
    this.token = token;
  }

  public static login(token: string) {
    return new GoogleAuthResponse(false, token);
  }

  public static signUp(token: string) {
    return new GoogleAuthResponse(true, token);
  }
}
