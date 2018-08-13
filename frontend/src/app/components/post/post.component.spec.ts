import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PostComponent } from './post.component';
import { PostsService } from '../../service/posts.service';
import { of } from 'rxjs';
import { Post } from '../../models/post';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let postsService: jasmine.SpyObj<PostsService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('PostsService', [
      'add_comment',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        PostComponent,
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        FontAwesomeModule,
        NgbModule.forRoot(),
      ],
      providers: [
        { provide: PostsService, useValue: spy },
      ],
    })
    .compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    postsService = TestBed.get(PostsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add comment', () => {
    const input = {
      value: '',
    };

    component.add_comment(input as HTMLInputElement);

    expect(postsService.add_comment.calls.count())
      .toBe(0, 'empty value passed to postsService');
  });

  it('should add comment', () => {
    component.post = new Post();
    component.post.id = 'abcdefg';

    postsService.add_comment.and.returnValue(of(new Post()));

    const input = {
      value: 'Test Post',
    };

    component.add_comment(input as HTMLInputElement);

    expect(postsService.add_comment.calls.count())
      .toBe(1, 'empty value passed to postsService');

    expect(input.value)
      .toBe('', 'input value not reset');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
