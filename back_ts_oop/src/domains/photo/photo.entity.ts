import { Column, Entity } from 'typeorm';
import AbstractBaseEntity from '../base.entity';

@Entity()
export default class Photo extends AbstractBaseEntity {
  @Column()
  private src: string;

  constructor(src: string) {
    super();
    this.src = src;
  }

  public static of(src: string): Photo {
    return new Photo(src);
  }

  getSrc() {
    return this.src;
  }
}
