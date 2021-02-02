import { EntityRepository, Repository } from 'typeorm';
import Photo from './photo.entity';

@EntityRepository()
export default class PhotoRepository extends Repository<Photo> {}
