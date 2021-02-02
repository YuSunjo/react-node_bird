import { EntityRepository, Repository } from 'typeorm';
import Photo from './photo.entity';

@EntityRepository(Photo)
export default class PhotoRepository extends Repository<Photo> {}
