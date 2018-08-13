import { TestBed, async } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { NewPostComponent } from './components/new-post/new-post.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PostComponent,
        UserSelectComponent,
        NewPostComponent,
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        FontAwesomeModule,
        NgbModule.forRoot(),
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
