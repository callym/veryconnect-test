import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../service/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {
  users: User[];
  current_user: User | null;

  constructor(private users_service: UsersService, private modal_service: NgbModal) {
    this.users = [];
  }

  ngOnInit() {
    this.users_service.all()
      .subscribe(users => this.users = users);
    this.users_service.current_user_observable
      .subscribe(user => this.current_user = user);
  }

  switch_user(user: User) {
    this.users_service.change_user(user);
  }

  new_user(content: any) {
    const modal = this.modal_service.open(content);
    modal.result.then(user => {
      if (user === '') {
        return;
      }

      this.users_service.create({ name: user })
        .subscribe(() => this.ngOnInit());
    });
  }
}
