import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Image extends AbstractBaseEntity {
  @Column({
    nullable: true,
    charset: 'utf8',
    collation: 'utf8_general_ci',
  })
  private src: string;

  constructor(src: string) {
    super();
    this.src = src;
  }

  public static of(src: string): Image {
    return new Image(src);
  }

  public getSrc() {
    return this.src;
  }
}
