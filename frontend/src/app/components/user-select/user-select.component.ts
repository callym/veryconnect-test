import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgxDecorate, Unsubscribe } from 'ngx-decorate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';

@NgxDecorate()
@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSelectComponent implements OnInit {
  users: User[];
  current_user: User | null;

  @Unsubscribe()
  users_all_subscription: Subscription;

  @Unsubscribe()
  users_current_subscription: Subscription;

  constructor(public users_service: UsersService, private modal_service: NgbModal, private cdx: ChangeDetectorRef) {
    this.users = [];
  }

  ngOnInit() {
    this.users_all_subscription = this.users_service.all()
      .subscribe(users => this.users = users);
    this.users_current_subscription = this.users_service.current_user_observable
      .subscribe(user => this.current_user = user);
  }

  switch_user(user: User) {
    this.users_service.change_user(user);
    this.users_service.logged_in = false;
    this.cdx.detectChanges();
  }

  new_user(content: any) {
    const modal = this.modal_service.open(content);
    modal.result.then(user => {
      if (user === '') {
        return;
      }

      this.users_service.create({ name: user })
        .pipe(first())
        .subscribe(() => this.ngOnInit());
    });
  }

  log_in() {
    this.users_service.logged_in = !this.users_service.logged_in;
    this.cdx.detectChanges();
  }
}
