import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../core.entity';

@Entity()
export class Member extends CoreEntity {
  @Column()
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
