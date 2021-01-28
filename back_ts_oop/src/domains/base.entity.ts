import { CreateDateColumn, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export default abstract class AbstractBaseEntity {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public getId(): number {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
