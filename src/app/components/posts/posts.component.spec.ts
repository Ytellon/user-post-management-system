import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Post } from '../model/post.interface';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: PostsService,
          useValue: {
            getPosts: () =>
              of({
                body: [
                  {
                    id: 1,
                    title: 'Post 1',
                    body: 'Body 1',
                    user_id: 1,
                  } as Post,
                ],
                headers: {
                  get: (header: string) => {
                    if (header === 'X-Pagination-Total') return '1';
                    if (header === 'X-Pagination-Pages') return '1';
                    return null;
                  },
                },
              }),
            deletePost: () => of({}),
            searchPosts: () =>
              of({
                body: [
                  {
                    id: 1,
                    title: 'Post 1',
                    body: 'Body 1',
                    user_id: 1,
                  } as Post,
                ],
                headers: {
                  get: (header: string) => {
                    if (header === 'X-Pagination-Total') return '1';
                    if (header === 'X-Pagination-Pages') return '1';
                    return null;
                  },
                },
              }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
    router = TestBed.inject(Router);
  });

  it('should create the PostsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on ngOnInit', () => {
    spyOn(postsService, 'getPosts').and.callThrough();

    component.ngOnInit();

    expect(postsService.getPosts).toHaveBeenCalledWith(
      component.currentPage,
      component.pageSize
    );
    expect(component.posts).toEqual([
      { id: 1, title: 'Post 1', body: 'Body 1', user_id: 1 } as Post,
    ]);
    expect(component.totalItems).toBe(1);
    expect(component.totalPages).toBe(1);
  });

  it('should submit form and navigate to edit-post', () => {
    spyOn(router, 'navigate');

    const postToEdit = {
      id: 1,
      title: 'Post 1',
      body: 'Body 1',
      user_id: 1,
    } as Post;

    component.editPost(postToEdit);

    expect(router.navigate).toHaveBeenCalledWith(['/edit-post/1']);
  });

  it('should delete post and fetch posts again', () => {
    spyOn(postsService, 'deletePost').and.callThrough();
    spyOn(postsService, 'getPosts').and.callThrough();

    const postToDelete = {
      id: 1,
      title: 'Post 1',
      body: 'Body 1',
      user_id: 1,
    } as Post;

    component.deletePost(postToDelete);

    expect(postsService.deletePost).toHaveBeenCalledWith(1);
    expect(postsService.getPosts).toHaveBeenCalledWith(
      component.currentPage,
      component.pageSize
    );
  });

});
