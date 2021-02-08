import { EntityRepository, Repository } from 'typeorm';
import Photo from './photo.entity';

@EntityRepository(Photo)
export default class PhotoRepository extends Repository<Photo> {
  public async findPhoto(authorId: number) {
    return await this.find({
      relations: ['author'],
      where: {
        author: authorId,
      },
    });
    // return await this.find({
    //   join: {
    //     alias: 'photo',
    //     leftJoinAndSelect: {
    //       author: 'photo.author',
    //     },
    //   },
    // });
  }
}
