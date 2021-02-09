import { Post } from '@src/domains/post/post.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class HashtagService {
  constructor(@InjectRepository(Post) private readonly hashtagRepository: Repository<Post>) {}
}
