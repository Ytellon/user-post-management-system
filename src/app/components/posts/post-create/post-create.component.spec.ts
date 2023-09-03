  import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { PostCreateComponent } from './post-create.component';
  import { PostsService } from '../../services/posts.service';
  import { Router } from '@angular/router';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { of } from 'rxjs';
  import { FormControl } from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatAutocompleteModule } from '@angular/material/autocomplete';



  describe('PostCreateComponent', () => {
    let component: PostCreateComponent;
    let fixture: ComponentFixture<PostCreateComponent>;
    let postsService: PostsService;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PostCreateComponent],
        imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule],
        providers: [
          {
            provide: PostsService,
            useValue: {
              searchUserByName: (value: string) =>
                of([{ id: 1, name: 'User 1' }]),
              createPost: (post: any) => of(post),
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

      fixture = TestBed.createComponent(PostCreateComponent);
      component = fixture.componentInstance;
      postsService = TestBed.inject(PostsService);
      router = TestBed.inject(Router);
    });

    it('should create the PostCreateComponent', () => {
      expect(component).toBeTruthy();
    });
    
    it('should select a user', () => {
      const userId = 1;

      component.selectUser(userId);

      expect(component.post.user_id).toEqual(userId);
    });

    it('should submit form and navigate to posts', () => {
      spyOn(router, 'navigate');
      spyOn(postsService, 'createPost').and.callThrough();

      component.onSubmit();

      expect(postsService.createPost).toHaveBeenCalledWith(component.post);
      expect(router.navigate).toHaveBeenCalledWith(['/posts']);
    });

  });
