import { Comment } from './comment';
import { User } from './user';

export interface IPost {
  text: string;
}

export class Post implements IPost {
  text: string;
  created_at: Date;
  updated_at: Date;
  id: string;

  comments: Comment[];
  user: User;

  public static fromJSON(data: any): Post {
    const post = new Post();

    post.text = data.text;
    post.created_at = new Date(data.createdAt);
    post.updated_at = new Date(data.updatedAt);
    post.id = data.id;

    post.comments = [];

    if (data.comments != null) {
      let comments: any[] = data.comments;
      comments = comments.map(c => Comment.fromJSON(c));
      comments = comments.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

      post.comments = comments;
    }

    post.user = data.user;

    return post;
  }

  public static toJSON(data: IPost): IPost {
    return {
      text: data.text,
    };
  }
}
