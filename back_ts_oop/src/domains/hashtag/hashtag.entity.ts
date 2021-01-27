import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Hashtag extends AbstractBaseEntity {
  @Column({
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public static of(name: string): Hashtag {
    return new Hashtag(name);
  }

  public getName() {
    return this.name;
  }
}
