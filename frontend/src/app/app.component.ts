import { Component, OnInit } from '@angular/core';
import { PostsService } from './service/posts.service';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[];

  constructor(private posts_service: PostsService) {
    this.posts = [];
  }

  ngOnInit() {
    this.posts_service.all()
      .subscribe(posts => this.posts = posts);
  }
}
