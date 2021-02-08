import AuthorRepository from '@src/domains/Author/author.repository';
import PhotoToAuthor from '@src/domains/postToCategory/photoToAuthor.repository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AuthorRegisterRequest } from './dto/author.request.dto';
import { AuthorResponse } from './dto/author.response.dto';

@Service()
export class AuthorService {
  constructor(@InjectRepository() private readonly authorRepository: AuthorRepository) {}

  public async registerAuthor(request: AuthorRegisterRequest) {
    const newAuthor = await this.authorRepository.save(request.toEntity());
    return AuthorResponse.of(newAuthor);
  }
}
