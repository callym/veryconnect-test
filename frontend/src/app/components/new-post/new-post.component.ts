import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { PostsService } from '../../service/posts.service';
import { UsersService } from '../../service/users.service';
import { Unsubscribe, NgxDecorate } from 'ngx-decorate';
import { Subscription } from 'rxjs';

@NgxDecorate()
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent implements OnInit {
  public has_user = false;

  @Unsubscribe()
  current_user_subscription: Subscription;

  constructor(private post_service: PostsService, private user_service: UsersService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.current_user_subscription = this.user_service.current_user_observable
      .subscribe(user => {
        this.has_user = user != null;
        this.cdr.detectChanges();
      });
  }

  public add_post(input: HTMLInputElement) {
    if (input.value === '') {
      return;
    }

    this.post_service.create({
      text: input.value,
    })
    .pipe(first())
    .subscribe(() => {
      input.value = '';
    });
  }
}
