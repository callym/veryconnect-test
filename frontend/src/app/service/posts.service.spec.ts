import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PostsService } from './posts.service';
import { Config } from '../config';
import { of, Observable } from 'rxjs';
import { Post, IPost } from '../models/post';
import { UsersService } from './users.service';
import { User } from '../models/user';

describe('PostsService', () => {
  let httpTestingController: HttpTestingController;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        UsersService,
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        FontAwesomeModule,
        NgbModule.forRoot(),
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    usersService = TestBed.get(UsersService);
  });

  it('should be created', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();

    const req = httpTestingController.expectOne(`${Config.endpoint}/post`);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  }));

  it('should have sorted posts', inject([PostsService], (service: PostsService) => {
    const req = httpTestingController.expectOne(`${Config.endpoint}/post`);
    expect(req.request.method).toEqual('GET');
    req.flush([
      { createdAt: 1 },
      { createdAt: 3 },
      { createdAt: 2 },
    ] as any as Post[]);

    service.posts.subscribe(posts => {
      expect(posts[0].created_at.getTime()).toBe(3);
      expect(posts[1].created_at.getTime()).toBe(2);
      expect(posts[2].created_at.getTime()).toBe(1);
    });
  }));

  it('should create post', inject([PostsService], (service: PostsService) => {
    const get_req = httpTestingController.expectOne(`${Config.endpoint}/post`);
    expect(get_req.request.method).toEqual('GET');
    get_req.flush([]);

    const data: IPost = {
      text: 'This is a post',
    };

    const ret: Post = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      id: 'abc',
      comments: [],
      user: undefined,
    };

    const user: User = {
      name: 'Test User',
      id: 'abc',
      created_at: new Date(),
      updated_at: new Date(),
      comments: [],
      posts: [],
    };
    usersService.change_user(user);

    service.create(data).subscribe();

    // it initially POSTs the new post...
    const req = httpTestingController.expectOne(`${Config.endpoint}/post`);
    expect(req.request.method).toEqual('POST');
    req.flush(ret);

    // ...then it PUTs it into the current user...
    const add_req = httpTestingController.expectOne(`${Config.endpoint}/user/${user.id}/posts/${ret.id}`);
    expect(add_req.request.method).toEqual('PUT');
    add_req.flush([]);

    // ...and then it refreshes the posts
    const get_req_end = httpTestingController.expectOne(`${Config.endpoint}/post`);
    expect(get_req_end.request.method).toEqual('GET');
    get_req_end.flush([]);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
