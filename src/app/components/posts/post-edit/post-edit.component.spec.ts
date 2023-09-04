import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostEditComponent } from './post-edit.component';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Post } from '../../model/post.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;
  let postsService: PostsService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostEditComponent],
      imports: [FormsModule, MatFormFieldModule, MatAutocompleteModule],
      providers: [
        {
          provide: PostsService,
          useValue: {
            getPostById: (id: number) =>
              of({
                id: 1,
                user_id: 1,
                title: 'Post 1',
                body: 'Body 1',
              } as Post),
            editPost: (post: Post) => of(post),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the PostEditComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post on ngOnInit', () => {
    spyOn(postsService, 'getPostById').and.callThrough();

    component.ngOnInit();

    expect(postsService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toEqual({
      id: 1,
      user_id: 1,
      title: 'Post 1',
      body: 'Body 1',
    } as Post);
  });

  it('should submit form and navigate to posts', () => {
    spyOn(router, 'navigate');
    spyOn(postsService, 'editPost').and.callThrough();

    component.onSubmit();

    expect(postsService.editPost).toHaveBeenCalledWith(component.post);
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });

});