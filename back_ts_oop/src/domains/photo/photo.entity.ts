import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import Author from '../Author/author.entity';
import AbstractBaseEntity from '../base.entity';
import PhotoToAuthor from '../postToCategory/postToAuthor.entity';

@Entity()
export default class Photo extends AbstractBaseEntity {
  @Column()
  private src: string;

  @ManyToOne((type) => Author, (author) => author.photos)
  @JoinColumn()
  author: number;

  @OneToMany(() => PhotoToAuthor, (photoToAuthor) => photoToAuthor.photo)
  photoToAuthor: PhotoToAuthor[];

  constructor(src: string, author: number) {
    super();
    this.src = src;
    this.author = author;
  }

  public static of(src: string, author: number): Photo {
    return new Photo(src, author);
  }

  public getSrc() {
    return this.src;
  }

  public getAuthor() {
    return this.author;
  }
}
