import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Config } from '../../config';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PostsService } from '../../service/posts.service';

import { NewPostComponent } from './new-post.component';
import { of } from 'rxjs';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let postsService: jasmine.SpyObj<PostsService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('PostsService', [
      'create',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        NewPostComponent,
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
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add post', () => {
    component.post = '';
    component.add_post();

    expect(postsService.create.calls.count())
      .toBe(0, 'empty value passed to postsService');
  });

  it('should add post', () => {
    postsService.create.and.returnValue(of([]));

    component.post = 'Test Post';
    component.add_post();

    expect(postsService.create.calls.count())
      .toBe(1, 'empty value passed to postsService');

    expect(component.post)
      .toBe('', 'input value not reset');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
