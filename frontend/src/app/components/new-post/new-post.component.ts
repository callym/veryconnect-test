import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostsService } from '../../service/posts.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  constructor(private post_service: PostsService, public user_service: UsersService) { }

  ngOnInit() {
  }

  public add_post(input: HTMLInputElement) {
    if (input.value === '') {
      return;
    }

    this.post_service.create({
      text: input.value,
    }).subscribe(() => {
      input.value = '';
    });
  }
}
