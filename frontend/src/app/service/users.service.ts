import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Config } from '../config';
import { Post, IPost } from '../models/post';
import { IComment, Comment } from '../models/comment';
import { User, IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Map<string, User>;

  private _current_user: BehaviorSubject<User | null>;

  public get has_user(): boolean {
    return this._current_user.value != null;
  }

  public get current_user(): User | null {
    return this._current_user.value;
  }

  public get current_user_observable(): Observable<User | null> {
    return this._current_user.asObservable();
  }

  constructor(private http: HttpClient) {
    this._current_user = new BehaviorSubject(null);
    this.users = new Map();
  }

  public all(): Observable<User[]> {
    return this.http.get(`${Config.endpoint}/user`)
      .pipe(
        map((json: any[]) => json.map(j => User.fromJSON(j))),
        tap(users => users.forEach(u => this.users.set(u.id, u))),
      );
  }

  public get_user(id: string): Observable<User> {
    if (this.users.get(id)) {
      return of(this.users.get(id));
    }

    return this.http.get(`${Config.endpoint}/user/${id}`)
      .pipe(
        map(json => User.fromJSON(json)),
        tap(user => this.users.set(user.id, user)),
      );
  }

  public create(data: IUser): Observable<User> {
    return this.http.post(
      `${Config.endpoint}/user`,
      User.toJSON(data),
    ).pipe(
      map(json => User.fromJSON(json))
    );
  }

  public change_user(user: User | null) {
    this._current_user.next(user);
  }

  public add_post(post: Post): Observable<Post> {
    return this.http.put(`${Config.endpoint}/user/${this.current_user.id}/posts/${post.id}`, {})
      .pipe(
        map(() => {
          post.user = this.current_user;
          return post;
        }),
      );
  }

  public add_comment(comment: Comment): Observable<Comment> {
    return this.http.put(`${Config.endpoint}/user/${this.current_user.id}/comments/${comment.id}`, {})
      .pipe(
        map(() => {
          comment.user = this.current_user;
          return comment;
        }),
      );
  }
}