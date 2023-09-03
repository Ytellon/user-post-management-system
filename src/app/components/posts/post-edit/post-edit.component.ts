import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post.interface';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: Post = {
    id: 0,
    user_id: 0,
    title: '',
    body: ''
  }

  constructor(private postsService: PostsService, private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postsService.getPostById(Number(postId)).subscribe((post: Post) => {
      this.post = post;
    });
  }

  onSubmit() {
    this.postsService.editPost(this.post).subscribe((updatedPost: Post) => {
      this.router.navigate(['/posts']);
    });
  }
}
