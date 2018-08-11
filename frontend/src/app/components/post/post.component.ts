import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';
import { PostsService } from '../../service/posts.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private post_service: PostsService, public user_service: UsersService) { }

  ngOnInit() {
  }

  public add_comment(input: HTMLInputElement) {
    if (input.value === '') {
      return;
    }

    this.post_service.add_comment(this.post.id, {
      text: input.value,
    }).subscribe(post => {
      this.post = post;
      input.value = '';
    });
  }
}
