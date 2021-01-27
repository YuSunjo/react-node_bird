import AbstractBaseEntity from '@src/domains/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class Post extends AbstractBaseEntity {
  @Column({
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci',
  })
  private content: string;

  constructor(content: string) {
    super();
    this.content = content;
  }

  public static of(content: string): Post {
    return new Post(content);
  }

  public getContent() {
    return this.content;
  }
}
