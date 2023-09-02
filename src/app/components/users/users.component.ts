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

  constructor(usersService: UsersService, private router: Router) {
    this.usersService = usersService;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe((users: User[]) => this.users = users);
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

}
