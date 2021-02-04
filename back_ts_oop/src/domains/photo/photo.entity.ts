import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Author from '../Author/author.entity';
import AbstractBaseEntity from '../base.entity';

@Entity()
export default class Photo extends AbstractBaseEntity {
  @Column()
  private src: string;

  @ManyToOne((type) => Author, (author) => author.photos)
  @JoinColumn()
  author: Author;

  constructor(src: string, author: Author) {
    super();
    this.src = src;
    this.author = author;
  }

  public static of(src: string, author: Author): Photo {
    return new Photo(src, author);
  }

  public getSrc() {
    return this.src;
  }

  public getAuthor() {
    return this.author;
  }
}
