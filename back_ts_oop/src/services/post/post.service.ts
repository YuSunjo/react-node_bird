import PostRepository from '@src/domains/post/post.repository';
import User from '@src/domains/user/user.entity';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { postRegisterRequest } from './dto/post.request.dto';
import { PostResponse } from './dto/post.response.dto';
import HashTagRepository from '@src/domains/hashtag/hashtag.repository';

@Service()
export class PostService {
  constructor(
    @InjectRepository() private readonly postRepository: PostRepository,
    @InjectRepository() private readonly hashtagRepository: HashTagRepository
  ) {}

  public async registerPost(request: postRegisterRequest, userId: User) {
    const hashtags = request.getContent().match(/(#[^\s#]+)/g);
    const newPost = await this.postRepository.save(request.toEntity(userId));
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          this.hashtagRepository.findOne({
            where: { name: tag.slice(1).toLowerCase() },
          });
        })
      );
      await this.postRepository.create({});
    }
    return PostResponse.of(newPost);
  }

  public async getPosts() {
    const posts = await this.postRepository.find();
    return posts.map((post) => {
      return PostResponse.of(post);
    });
  }
}
