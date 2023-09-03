import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../../model/user.interface';
import { UsersService } from '../../services/users.service';
import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUserById', 'editUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } } });

    TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    });

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user by id on init', () => {
    const user: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com', gender: 'male', status: 'active' };
    usersServiceSpy.getUserById.and.returnValue(of(user));

    component.ngOnInit();

    expect(usersServiceSpy.getUserById).toHaveBeenCalledWith(1);
    expect(component.user).toEqual(user);
  });

  it('should edit user on submit', () => {
    const user: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com', gender: 'male', status: 'active' };
    usersServiceSpy.editUser.and.returnValue(of(user));

    component.onSubmit();

    expect(usersServiceSpy.editUser).toHaveBeenCalledWith(component.user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });
});