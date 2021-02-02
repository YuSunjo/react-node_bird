import { Column, Entity, OneToMany } from 'typeorm';
import AbstractBaseEntity from '../base.entity';
import Photo from '../photo/photo.entity';

@Entity()
export default class Author extends AbstractBaseEntity {
  @Column()
  private name: string;

  @OneToMany((type) => Photo, (photo) => photo.author)
  photos: Photo[];

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
