/*
This class provides the PostsService,
and is responsible for:
* getting all posts from the server
* creating new posts and comments

`_posts` is a BehaviorSubject because it acts like an Observable,
but is guaranteed to always have a value,
meaning that when other classes subscribe to it, they immediately
get the current list of posts, and also are informed when that
list is updated (e.g. through creating a post, or potentially
through a WebSockets notification of a new post).
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { Config } from '../config';
import { Post, IPost } from '../models/post';
import { IComment, Comment } from '../models/comment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private _posts: BehaviorSubject<Post[]>;
  public get posts(): Observable<Post[]> {
    return this._posts.asObservable();
  }

  constructor(private http: HttpClient, private users_service: UsersService) {
    this._posts = new BehaviorSubject([]);
    this.get_all().subscribe();
  }

  private get_all(): Observable<Post[]> {
    return this.http.get(`${Config.endpoint}/post`)
      .pipe(
        map((json: any[]) => json.map(j => Post.fromJSON(j))),
        tap(posts => {
          posts = posts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

          for (const post of posts) {
            if (typeof post.user === 'string') {
              this.users_service.get_user(post.user)
                .subscribe(u => post.user = u);
            }

            for (const comment of post.comments) {
              if (typeof comment.user === 'string') {
                this.users_service.get_user(comment.user)
                  .subscribe(u => comment.user = u);
              }
            }
          }

          this._posts.next(posts);
        }),
      );
  }

  public create(data: IPost): Observable<Post> {
    return this.http.post(
      `${Config.endpoint}/post`,
      Post.toJSON(data),
    ).pipe(
      map(json => Post.fromJSON(json)),
      flatMap(post => this.users_service.add_post(post)),
      tap(() => this.get_all().subscribe()),
    );
  }

  public add_comment(post_id: string, comment: IComment | string): Observable<Post> {
    if (typeof comment !== 'string') {
      return this.http.post(`${Config.endpoint}/comment`, Comment.toJSON(comment))
        .pipe(
          flatMap(c => this.users_service.add_comment(Comment.fromJSON(c))),
          flatMap(c => this.add_comment(post_id, c.id)),
        );
    }

    return this.http.put(`${Config.endpoint}/post/${post_id}/comments/${comment}`, {})
      .pipe(
        map(json => Post.fromJSON(json)),
        tap(() => this.get_all().subscribe()),
      );
  }
}
