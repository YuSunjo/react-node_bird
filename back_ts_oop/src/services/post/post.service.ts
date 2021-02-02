import PostRepository from '@src/domains/post/post.repository';
import User from '@src/domains/user/user.entity';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { postRegisterRequest } from './dto/post.request.dto';
import { PostResponse } from './dto/post.response.dto';

@Service()
export class PostService {
  constructor(@InjectRepository() private readonly postRepository: PostRepository) {}

  public async registerPost(request: postRegisterRequest, userId: User) {
    const newPost = await this.postRepository.save(request.toEntity(userId));
    return PostResponse.of(newPost);
  }

  public async getPosts() {
    const posts = await this.postRepository.find();
    return posts.map((post) => {
      return PostResponse.of(post);
    });
  }
}
