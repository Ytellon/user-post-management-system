import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreateComponent } from './user-create.component';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserPost } from '../../model/user.interface';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let usersService: UsersService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreateComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: () =>
              of({
                name: 'User 1',
                email: 'user1@example.com',
                gender: 'Male',
                status: 'Active',
              } as UserPost),
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

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
  });

  it('should create the UserCreateComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and navigate to /users', () => {
    spyOn(usersService, 'createUser').and.callThrough();
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(usersService.createUser).toHaveBeenCalledWith(component.user);
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });
});
