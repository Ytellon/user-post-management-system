import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { User } from '../../model/user.interface';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let usersService: UsersService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserById: () =>
              of({
                id: 1,
                name: 'User 1',
                email: 'user1@example.com',
                gender: 'Male',
                status: 'Active',
              } as User),
            editUser: () =>
              of({
                id: 1,
                name: 'User 1',
                email: 'user1@example.com',
                gender: 'Male',
                status: 'Active',
              } as User),
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
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
      ],
    });

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the UserEditComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on ngOnInit', () => {
    spyOn(usersService, 'getUserById').and.callThrough();

    component.ngOnInit();

    expect(usersService.getUserById).toHaveBeenCalledWith(1);
    expect(component.user).toEqual({
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
      gender: 'Male',
      status: 'Active',
    } as User);
  });

  it('should submit form and navigate to /users', () => {
    spyOn(usersService, 'editUser').and.callThrough();
    spyOn(router, 'navigate');

    component.onSubmit();

    expect(usersService.editUser).toHaveBeenCalledWith(component.user);
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

});