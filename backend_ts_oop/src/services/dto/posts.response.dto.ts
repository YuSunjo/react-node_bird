import { Comment } from '@src/domains/comment/commet.entity';
import { Image } from '@src/domains/Image/image.entity';
import { Like } from '@src/domains/like/like.entity';
import { Member } from '@src/domains/member/member.entity';
import { Post } from '@src/domains/post/post.entity';

export class PostsResponse {
  private readonly content: string;
  private readonly comments: Comment[];
  private readonly images: Image[];
  private readonly likes: Like[];
  private readonly member: Member;
  private readonly posts: Post[];

  constructor(content: string, comments: Comment[], images: Image[], likes: Like[], member: Member, posts: Post[]) {
    this.content = content;
    this.comments = comments;
    this.images = images;
    this.likes = likes;
    this.member = member;
    this.posts = posts;
  }

  static of(post: Post) {
    return new PostsResponse(post.getContent(), post.comments, post.images, post.likes, post.member, post.posts);
  }
}
