import { Column, Entity } from 'typeorm';
import AbstractBaseEntity from '@src/domains/base.entity';

@Entity()
export class Sample extends AbstractBaseEntity {
  @Column()
  title: string;

  @Column()
  count: number;

  constructor(title: string, count: number) {
    super();
    this.title = title;
    this.count = count;
  }
}
