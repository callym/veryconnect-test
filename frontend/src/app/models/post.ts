export interface IPost {
  text: string;
}

export class Post implements IPost {
  text: string;
  created_at: Date;
  updated_at: Date;
  id: string;

  public static fromJSON(data: any): Post {
    const post = new Post();

    post.text = data.text;
    post.created_at = new Date(data.createdAt);
    post.updated_at = new Date(data.updatedAt);
    post.id = data.id;

    return post;
  }

  public static toJSON(data: IPost): any {
    return {
      text: data.text,
    };
  }
}
