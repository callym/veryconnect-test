import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../models/post';
import { PostsService } from '../../service/posts.service';
import { UsersService } from '../../service/users.service';
import { first } from 'rxjs/operators';
import { Unsubscribe, NgxDecorate } from 'ngx-decorate';
import { Subscription } from 'rxjs';

@NgxDecorate()
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  public comment = '';

  @Unsubscribe()
  current_user_subscription: Subscription;

  public has_user = false;

  constructor(private post_service: PostsService, public user_service: UsersService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.current_user_subscription = this.user_service.current_user_observable
      .subscribe(user => {
        this.has_user = user != null;
        this.cdr.detectChanges();
      });
  }

  public add_comment() {
    if (this.comment === '') {
      return;
    }

    this.post_service.add_comment(this.post.id, {
      text: this.comment,
    })
    .pipe(first())
    .subscribe(post => {
      this.post = post;
      this.comment = '';
    });
  }
}
