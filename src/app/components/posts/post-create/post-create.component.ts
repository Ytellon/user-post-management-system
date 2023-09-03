import { Component } from '@angular/core';
import { CreatePost } from '../../model/post.interface';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  post: CreatePost = {
    user_id: 0,
    title: '',
    body: ''
  }

  constructor(private postsService: PostsService, private router: Router) {}

  onSubmit() {
    this.postsService.createPost(this.post).subscribe((newPost: CreatePost) => {
      this.router.navigate(['/posts']);
    });
  }

}
