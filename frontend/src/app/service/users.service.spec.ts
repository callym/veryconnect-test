import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersService } from './users.service';
import { Config } from '../config';

describe('UsersService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all users', inject([UsersService], (service: UsersService) => {
    service.all().subscribe();

    const req = httpTestingController.expectOne(`${Config.endpoint}/user`);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  }));

  it('should get specific users', inject([UsersService], (service: UsersService) => {
    const id = 'abc';
    service.get_user(id).subscribe();

    const req = httpTestingController.expectOne(`${Config.endpoint}/user/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
