import { EntityRepository, Repository } from 'typeorm';
import Comment from './comment.entity';

@EntityRepository(Comment)
export default class UserRepository extends Repository<Comment> {}
