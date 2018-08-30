/*
This class provides the UsersService,
and is responsible for:
* getting all users from the server
* storing the currently active user
* switching users
* registering new users
* assigning posts and comments to users

`users` is a Map to stop duplicate lookups when calling `get_user`
`_current_user` is a BehaviorSubject because it acts like an Observable,
but is guaranteed to always have a value,
meaning that when other classes subscribe to `current_user_observable`, they immediately
get the current user (or `null`), and when that user is changed,
they are immediately informed of this change.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgxDecorate, Complete } from 'ngx-decorate';
import { Config } from '../config';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { User, IUser } from '../models/user';

@NgxDecorate()
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Map<string, User>;

  public logged_in = false;

  @Complete()
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
    return this.http.get<any[]>(`${Config.endpoint}/user`)
      .pipe(
        map(json => json.map(u => new User(u))),
        tap(users => users.forEach(u => this.users.set(u.id, u))),
      );
  }

  public get_user(id: string): Observable<User> {
    if (this.users.get(id)) {
      return of(this.users.get(id));
    }

    return this.http.get<User>(`${Config.endpoint}/user/${id}`)
      .pipe(
        tap(user => this.users.set(user.id, user)),
      );
  }

  public create(data: IUser): Observable<User> {
    return this.http.post<User>(
      `${Config.endpoint}/user`,
      User.toJSON(data),
    );
  }

  public change_user(user: User | null) {
    this._current_user.next(user);
  }

  public add_post(post: Post): Observable<Post> {
    const headers = {};
    if (this.logged_in === true) {
      headers['Authorization'] = this.current_user.id;
    }

    return this.http.put(`${Config.endpoint}/user/${this.current_user.id}/posts/${post.id}`, {}, { headers })
      .pipe(
        map(() => {
          post.user = this.current_user;
          return post;
        }),
      );
  }
}
