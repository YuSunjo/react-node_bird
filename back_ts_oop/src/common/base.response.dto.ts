export default abstract class BaseEntityResponse {
  private readonly id: number;

  private readonly createdAt: Date;

  private readonly updatedAt: Date;

  constructor(id: number, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

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
