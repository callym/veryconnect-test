import { Proto } from 'typescript-proto-decorator';

import { Model } from './models';

import { Comment } from './comment';
import { User } from './user';

export interface IPost {
  text: string;
}

export class Post extends Model<IPost> implements IPost {
  text: string;

  @Proto([])
  comments: Comment[];

  user: User;

  public constructor(data: any) {
    super(data);

    this.text = data.text;

    if (data.comments != null) {
      let comments: any[] = data.comments;
      comments = comments.map(c => new Comment(c));
      this.comments = comments;
    }

    this.user = data.user;
  }

  public static toJSON(data: IPost): IPost {
    return {
      text: data.text,
    };
  }
}
