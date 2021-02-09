export class LoginUserResponse {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public static login(token: string) {
    return new LoginUserResponse(token);
  }
}
