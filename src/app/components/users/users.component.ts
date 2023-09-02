import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'; 
import { User, UserPost } from '../model/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersService: UsersService;
  users: User[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  searchTerm: string = '';
  selectedSearchOption: string = 'name';
  showNoUsersFoundMessage: boolean = false;

  constructor(usersService: UsersService, private router: Router) {
    this.usersService = usersService;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers(this.currentPage, this.pageSize)
      .subscribe((response: any) => {
        this.users = response.body;
        this.totalItems = Number(response.headers.get('X-Pagination-Total'));
        this.totalPages = Number(response.headers.get('X-Pagination-Pages'));
      });
  }

   deleteUser(userToDelete: User) {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir ${userToDelete.name}?`);
    
    if (confirmDelete) {
      this.usersService.deleteUser(userToDelete.id).subscribe(() => {
        this.getUsers();
      });
    }
  }

  editUser(userToEdit: User) {
    this.router.navigate([`/edit-user/${userToEdit.id}`]);
  }

  goToNextPage() {
    if (this.currentPage < this.totalItems / this.pageSize) {
      this.currentPage++;
      this.getUsers();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers();
    }
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.getUsers();
  }

  goToLastPage() {
    this.currentPage = Math.ceil(this.totalItems / this.pageSize);
    this.getUsers();
  }

  searchUsers() {
  if (this.searchTerm.trim() !== '') {
    const searchBy = this.selectedSearchOption === 'name' ? 'name' : 'email';
    this.usersService.searchUsers(this.searchTerm, searchBy)
      .subscribe((response: any) => {
        if (response.body.length === 0) {
          this.showNoUsersFoundMessage = true;
        }
        this.users = response.body;
        this.totalItems = +response.headers.get('X-Pagination-Total')
        this.totalPages = +response.headers.get('X-Pagination-Pages')
        this.searchTerm = '';
      });
  } else {
    this.getUsers();
  }
}

}
