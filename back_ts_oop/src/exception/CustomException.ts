import BaseException from '@src/exception/BaseException';

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(404, 'NOT_FOUND_EXCEPTION', message);
  }
}

export class ConflictException extends BaseException {
  constructor(message: string) {
    super(409, 'CONFLICT_EXCEPTION', message);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(401, 'UNAUTHORIZED_EXCEPTION', message);
  }
}

export class BadGateWayException extends BaseException {
  constructor(message: string) {
    super(502, 'BAD_GATEWAY_EXCEPTIOIN', message);
  }
}
