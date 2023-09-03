import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    const page = 1;
    const perPage = 10;

    service.getPosts(page, perPage).subscribe((response: any) => {
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${service.getApiPostUrl()}?page=${page}&per_page=${perPage}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should search users by name', () => {
    const name = 'John';

    service.searchUserByName(name).subscribe((users: any[]) => {
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(
      `${service.getApiUserUrl()}?name=${name}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should search posts', () => {
    const searchTerm = 'example';
    const searchBy = 'title';

    service.searchPosts(searchTerm, searchBy).subscribe((response: any) => {
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${service.getApiPostUrl()}?${searchBy}=${searchTerm}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should get post by ID', () => {
    const postId = 1;

    service.getPostById(postId).subscribe((post: any) => {
      expect(post).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${service.getApiPostUrl()}/${postId}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should create post', () => {
    const newPost = {
      user_id: 1,
      title: 'Post title',
      body: 'Post body',
    };

    service.createPost(newPost).subscribe((post: any) => {
      expect(post).toBeDefined();
      expect(post.user_id).toBe(newPost.user_id);
      expect(post.title).toBe(newPost.title);
    });

    const req = httpTestingController.expectOne(service.getApiPostUrl());
    expect(req.request.method).toBe('POST');
  });

  it('should edit post', () => {
    const updatedPost = {
      id: 1,
      user_id: 1,
      title: 'Post title',
      body: 'Post body',
    };

    service.editPost(updatedPost).subscribe((post: any) => {
      expect(post).toBeDefined();
      expect(post.id).toBe(updatedPost.id);
      expect(post.user_id).toBe(updatedPost.user_id);
      expect(post.title).toBe(updatedPost.title);
    });

    const req = httpTestingController.expectOne(
      `${service.getApiPostUrl()}/${updatedPost.id}`
    );
    expect(req.request.method).toBe('PUT');
  });

  it('should delete post', () => {
    const postId = 1;

    service.deletePost(postId).subscribe((response: any) => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${service.getApiPostUrl()}/${postId}`
    );
    expect(req.request.method).toBe('DELETE');
  });
});
