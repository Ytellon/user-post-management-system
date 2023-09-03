import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersService } from '../services/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersService: UsersService;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      providers: [UsersService],
    });

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
  });

  it('should create the UsersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on ngOnInit', () => {
    const dummyUsers = [
      { id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active' },
      { id: 2, name: 'User 2', email: 'user2@example.com', gender: 'male', status: 'active' },
    ];

    spyOn(usersService, 'getUsers').and.returnValue(
      of({
        body: dummyUsers,
        headers: {
          get: (header: string) => {
            if (header === 'X-Pagination-Total') return '2';
            if (header === 'X-Pagination-Pages') return '1';
            return null;
          },
        },
      })
    );

    component.ngOnInit();

    expect(component.users).toEqual(dummyUsers);
    expect(component.totalItems).toBe(2);
    expect(component.totalPages).toBe(1);
  });

  it('should handle error when fetching users', () => {
    spyOn(usersService, 'getUsers').and.returnValue(
      throwError('Error fetching users')
    );

    component.ngOnInit();

    expect(component.users.length).toBe(0);
    expect(component.totalItems).toBe(0);
    expect(component.totalPages).toBe(0);
  });

  it('should delete a user', () => {
    const userToDelete = { id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active' };
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(usersService, 'deleteUser').and.returnValue(of({}));

    component.deleteUser(userToDelete);

    expect(usersService.deleteUser).toHaveBeenCalledWith(userToDelete.id);
  });

  it('should not delete a user if not confirmed', () => {
    const userToDelete = { id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active' };
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(usersService, 'deleteUser').and.returnValue(of({}));

    component.deleteUser(userToDelete);

    expect(usersService.deleteUser).not.toHaveBeenCalled();
  });

  it('should navigate to edit user', () => {
    const userToEdit = { id: 1, name: 'User 1', email: 'user1@example.com', gender: 'male', status: 'active' };
    
    spyOn(router, 'navigate');

    component.editUser(userToEdit);

    expect(router).toHaveBeenCalledWith(['/edit-user', userToEdit.id]);
  });

  it('should reset search term and get users', () => {
    component.searchTerm = 'test';
    spyOn(usersService, 'getUsers').and.returnValue(
      of({ body: [], headers: {} })
    );

    component.searchUsers();

    expect(component.searchTerm).toBe('');
    expect(usersService.getUsers).toHaveBeenCalled();
  });

  it('should show no users found message when no results', () => {
    component.searchTerm = 'nonexistentuser';
    spyOn(usersService, 'searchUsers').and.returnValue(
      of({
        body: [],
        headers: { get: () => '0' },
      })
    );

    component.searchUsers();

    expect(component.showNoUsersFoundMessage).toBe(true);
  });

});