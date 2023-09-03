import { Component } from '@angular/core';
import { CreatePost } from '../../model/post.interface';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  post: CreatePost = {
    user_id: 0,
    title: '',
    body: '',
  };

  userControl = new FormControl();
  filteredUsers: any[] = [];

  constructor(
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userControl.valueChanges.subscribe((value) => {
      this.filterUsers(value);
    });
  }

  filterUsers(value: string) {
    this.postsService.searchUserByName(value).subscribe((users: any[]) => {
      this.filteredUsers = users;
    });
  }

  selectUser(userId: number) {
    this.post.user_id = userId;
  }

  onSubmit() {
    this.postsService.createPost(this.post).subscribe((newPost: CreatePost) => {
      this.router.navigate(['/posts']);
    });
  }
}