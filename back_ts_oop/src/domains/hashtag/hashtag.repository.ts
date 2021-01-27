import { EntityRepository, Repository } from 'typeorm';
import Hashtag from './hashtag.entity';

@EntityRepository(Hashtag)
export default class UserRepository extends Repository<Hashtag> {}
