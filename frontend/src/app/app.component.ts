import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxDecorate, Unsubscribe } from 'ngx-decorate';
import { PostsService } from './service/posts.service';
import { Post } from './models/post';

@NgxDecorate()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[];

  @Unsubscribe()
  posts_subscription: Subscription;

  constructor(private posts_service: PostsService) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts_subscription = this.posts_service.posts
      .subscribe(posts => this.posts = posts);
  }
}
