import { EntityRepository, Repository } from 'typeorm';
import Image from './image.entity';

@EntityRepository(Image)
export default class UserRepository extends Repository<Image> {}
