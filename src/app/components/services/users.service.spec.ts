import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const TEST_API_URL = 'https://gorest.co.in/public/v2/users';

  it('should search users', () => {
    const searchTerm = 'John';
    const searchBy = 'name';

    service.searchUsers(searchTerm, searchBy).subscribe((response: any) => {
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${TEST_API_URL}?${searchBy}=${searchTerm}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should get user by ID', () => {
    const userId = 1;

    service.getUserById(userId).subscribe((user) => {
      expect(user).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${TEST_API_URL}/${userId}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should create user', () => {
    const newUser = { name: 'John', email: 'john@example.com', gender: 'male', status: 'active' };

    service.createUser(newUser).subscribe((user) => {
      expect(user).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${TEST_API_URL}`
    );
    expect(req.request.method).toBe('POST');
  });

  it('should edit user', () => {
    const editedUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      gender: 'male',
      status: 'active',
    };

    service.editUser(editedUser).subscribe((user) => {
      expect(user).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${TEST_API_URL}/${editedUser.id}`
    );
    expect(req.request.method).toBe('PUT');
  });

  it('should delete user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      `${TEST_API_URL}/${userId}`
    );
    expect(req.request.method).toBe('DELETE');
  });
});
