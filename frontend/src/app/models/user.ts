import { Comment } from './comment';
import { Post } from './post';

export interface IUser {
  name: string;
}

export class User implements IUser {
  name: string;
  created_at: Date;
  updated_at: Date;
  id: string;

  comments: Comment[];
  posts: Post[];

  public static fromJSON(data: any): User {
    const user = new User();

    user.name = data.name;
    user.created_at = new Date(data.createdAt);
    user.updated_at = new Date(data.updatedAt);
    user.id = data.id;

    user.comments = [];

    if (data.comments != null) {
      const comments: any[] = data.comments;
      comments.forEach(c => {
        const comment = Comment.fromJSON(c);
        user.comments.push(comment);
      });
    }

    user.posts = [];

    if (data.posts != null) {
      const posts: any[] = data.posts;
      posts.forEach(p => {
        const post = Post.fromJSON(p);
        user.posts.push(post);
      });
    }

    return user;
  }

  public static toJSON(data: IUser): IUser {
    return {
      name: data.name,
    };
  }
}
