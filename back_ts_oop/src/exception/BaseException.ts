import { HttpError } from 'routing-controllers';

export default abstract class BaseException extends HttpError {
  constructor(status: number, name: string, message: string) {
    super(status);
    Object.setPrototypeOf(this, BaseException.prototype);
    this.name = name;
    this.message = message;
  }
  toJSON() {
    return {
      status: this.httpCode,
      error: this.name,
      message: this.message,
    };
  }
}
