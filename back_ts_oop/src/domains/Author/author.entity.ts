import { Column, Entity } from 'typeorm';
import AbstractBaseEntity from '../base.entity';

@Entity()
export default class Author extends AbstractBaseEntity {
  @Column()
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public static of(name) {
    return new Author(name);
  }

  public getName() {
    return this.name;
  }
}
