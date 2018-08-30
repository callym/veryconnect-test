import { Model } from './models';

import { User } from './user';

export interface IComment {
  text: string;
  [x: string]: any;
}

export class Comment extends Model<IComment> implements IComment {
  text: string;
  user: User;

  public constructor(data: any) {
    super(data);

    this.text = data.text;
    this.user = data.user;
  }

  public static toJSON(data: IComment): IComment {
    return {
      text: data.text,
    };
  }
}
