import { Column, Entity } from 'typeorm';
import AbstractBaseEntity from '@src/domains/base.entity';

@Entity()
export default class Sample extends AbstractBaseEntity {
  @Column()
  private name: string;

  @Column()
  private description: string;

  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }

  static of(name: string, description: string): Sample {
    return new Sample(name, description);
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }
}
