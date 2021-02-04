import Author from '@src/domains/Author/author.entity';
import { PhotoRegisterRequest } from '@src/domains/photo/dto/photo.request.dto';
import { PhotoResponse, RetrievePhotoResponse } from '@src/domains/photo/dto/photo.response.dto';
import PhotoRepository from '@src/domains/photo/photo.repository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PhotoService {
  constructor(@InjectRepository() private readonly photoRepository: PhotoRepository) {}

  public async registerPhoto(request: PhotoRegisterRequest, authorId: Author) {
    const newPhoto = await this.photoRepository.save(request.toEntity(authorId));
    return PhotoResponse.of(newPhoto);
  }

  public async retrievePhoto(authorId: number) {
    const userPhotos = await this.photoRepository.findPhoto(authorId);
    console.log(userPhotos);
    return userPhotos.map((userPhoto) => {
      return RetrievePhotoResponse.of(userPhoto);
    });
  }
}
