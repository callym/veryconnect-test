import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';
import { Post, IPost } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public all(): Observable<Post[]> {
    return this.http.get(`${Config.endpoint}/post`)
      .pipe(
        map((json: any[]) => json.map(j => Post.fromJSON(j))),
      );
  }

  public create(data: IPost): Observable<Post> {
    return this.http.post(
      `${Config.endpoint}/post`,
      Post.toJSON(data),
    ).pipe(
      map(json => Post.fromJSON(json))
    );
  }

  public get_post(id: string): Observable<Post> {
    return this.http.get(`${Config.endpoint}/post/${id}`)
      .pipe(
        map(json => Post.fromJSON(json)),
      );
  }
}
