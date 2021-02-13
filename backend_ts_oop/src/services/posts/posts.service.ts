import { Post } from '@src/domains/post/post.entity';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PostsResponse } from '../dto/posts.response.dto';

@Service()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postsRepository: Repository<Post>) {}

  //미완성인듯....
  public async retrievePosts(lastId: number) {
    const posts = await this.postsRepository.find({
      relations: ['member', 'images', 'likes', 'retweet', 'comments', 'posts'],
      skip: lastId,
      take: 10,
    });
    return posts.map((post) => {
      return PostsResponse.of(post);
    });
  }
}
