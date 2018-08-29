export abstract class Model<I> {
  created_at: Date;
  updated_at: Date;
  id: string;

  constructor(data: any) {
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.id = data.id;
  }
}
