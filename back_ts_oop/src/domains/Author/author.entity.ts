import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import AbstractBaseEntity from '../base.entity';
import Photo from '../photo/photo.entity';
import PhotoToAuthor from '../postToCategory/postToAuthor.entity';

@Entity()
export default class Author extends AbstractBaseEntity {
  @Column()
  private name: string;

  @OneToMany((type) => Photo, (photo) => photo.author)
  photos: Photo[];

  @OneToMany(() => PhotoToAuthor, (photoToAuthor) => photoToAuthor.author)
  photoToAuthor: PhotoToAuthor[];

  constructor(name: string) {
    super();
    this.name = name;
  }

  public static of(name: string) {
    return new Author(name);
  }

  public getName() {
    return this.name;
  }
}
