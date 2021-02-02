import { EntityRepository, Repository } from 'typeorm';
import Author from './author.entity';

@EntityRepository(Author)
export default class UserRepository extends Repository<Author> {}
