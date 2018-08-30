import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostsService } from '../../service/posts.service';
import { UsersService } from '../../service/users.service';
import { Unsubscribe, NgxDecorate } from 'ngx-decorate';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnauthorizedModalComponent } from '../unauthorized-modal/unauthorized-modal.component';

@NgxDecorate()
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent implements OnInit {
  public has_user = false;

  public post = '';

  @Unsubscribe()
  current_user_subscription: Subscription;

  constructor(
    private post_service: PostsService,
    private user_service: UsersService,
    private modal: NgbModal,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.current_user_subscription = this.user_service.current_user_observable
      .subscribe(user => {
        this.has_user = user != null;
        this.cdr.detectChanges();
      });
  }

  public add_post() {
    if (this.post === '') {
      return;
    }

    this.post_service.create({
      text: this.post,
    })
    .pipe(first())
    .subscribe(() => {
      this.post = '';
    }, err => {
      if (err.error === 'Unauthorized') {
        this.modal.open(UnauthorizedModalComponent);
      }
    });
  }
}
