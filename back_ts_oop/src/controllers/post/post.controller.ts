import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

export default class PostService {
  constructor(@InjectRepository() private readonly PostRespository) {}

  public async registerBoardV1(request) {}
}
