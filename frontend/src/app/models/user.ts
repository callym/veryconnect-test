import { Model } from './models';

import { Comment } from './comment';
import { Post } from './post';
import { Proto } from 'typescript-proto-decorator';

export interface IUser {
  name: string;
}

export class User extends Model<IUser> implements IUser {
  name: string;

  @Proto([])
  comments: Comment[];

  @Proto([])
  posts: Post[];

  public constructor(data: any) {
    super(data);

    this.name = data.name;

    if (data.comments != null) {
      this.comments = [];
      const comments: any[] = data.comments;
      comments.forEach(c => {
        const comment = new Comment(c);
        this.comments.push(comment);
      });
    }

    if (data.posts != null) {
      this.posts = [];
      const posts: any[] = data.posts;
      posts.forEach(p => {
        const post = new Post(p);
        this.posts.push(post);
      });
    }
  }

  public static toJSON(data: IUser): IUser {
    return {
      name: data.name,
    };
  }
}
