import { EntityRepository, Repository } from 'typeorm';
import PhotoToAuthor from '@src/domains/postToCategory/postToAuthor.entity';

@EntityRepository(PhotoToAuthor)
export default class PhotoToAuthorRepository extends Repository<PhotoToAuthor> {}
