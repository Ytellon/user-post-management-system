import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/post.interface';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postsService: PostsService;
  posts: Post[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  searchTerm: string = '';
  selectedSearchOption: string = 'title';
  showNoPostsFoundMessage: boolean = false;

  constructor(postsService: PostsService, private router: Router) {
    this.postsService = postsService;
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService
      .getPosts(this.currentPage, this.pageSize)
      .subscribe((response: any) => {
        this.posts = response.body;
        this.totalItems = Number(response.headers.get('X-Pagination-Total'));
        this.totalPages = Number(response.headers.get('X-Pagination-Pages'));
      });
  }

  deletePost(postToDelete: Post) {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir ${postToDelete.title}?`
    );

    if (confirmDelete) {
      this.postsService.deletePost(postToDelete.id).subscribe(() => {
        this.getPosts();
      });
    }
  }

  editPost(postToEdit: Post) {
    this.router.navigate([`/edit-post/${postToEdit.id}`]);
  }

  goToNextPage() {
    if (this.currentPage < this.totalItems / this.pageSize) {
      this.currentPage++;
      this.getPosts();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPosts();
    }
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.getPosts();
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.getPosts();
  }

  searchPosts() {
    if (this.searchTerm.trim() !== '') {
      const searchBy = this.selectedSearchOption === 'user' ? 'user' : 'title';

      this.postsService.searchPosts(this.searchTerm, searchBy)
      .subscribe((response: any) => {
        if (searchBy === 'user') {
          const firstUser = response.body[0];
          if (firstUser) {
            this.postsService.getPostByUserId(firstUser.id)
            .subscribe((postsResponse: any) => {
              this.posts = postsResponse.body;
              this.totalItems = Number(response.headers.get('X-Pagination-Total'));
              this.totalPages = Number(response.headers.get('X-Pagination-Pages'));
            });
          } else {
            this.showNoPostsFoundMessage = true;
            this.posts = [];
            this.totalItems = 0;
          } 
        } else {
          this.posts = response.body;
          this.totalItems = Number(response.headers.get('X-Pagination-Total'));
          this.totalPages = Number(response.headers.get('X-Pagination-Pages'));
        }
      });
    } else {
      this.getPosts();
    }
  }
}
