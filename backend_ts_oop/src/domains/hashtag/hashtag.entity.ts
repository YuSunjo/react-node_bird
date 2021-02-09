import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../core.entity';
import { PostHashtag } from '../postHashtag/postHashtag.entity';

@Entity()
export class Hashtag extends CoreEntity {
  @Column()
  private name: string;

  @OneToMany(() => PostHashtag, (posthashtag) => posthashtag.hashtag)
  posthashtags: PostHashtag[];

  constructor(name: string) {
    super();
    this.name = name;
  }

  public getName() {
    return this.name;
  }
}
