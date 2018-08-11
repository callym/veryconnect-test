import { User } from "./user";

export interface IComment {
  text: string;
}

export class Comment implements IComment {
  text: string;
  created_at: Date;
  updated_at: Date;
  id: string;

  user: User;

  public static fromJSON(data: any): Comment {
    const comment = new Comment();

    comment.text = data.text;
    comment.created_at = new Date(data.createdAt);
    comment.updated_at = new Date(data.updatedAt);
    comment.id = data.id;

    comment.user = data.user;

    return comment;
  }

  public static toJSON(data: IComment): IComment {
    return {
      text: data.text,
    };
  }
}
