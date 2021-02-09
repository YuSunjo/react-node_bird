import { Post } from '@src/domains/post/post.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}
}
