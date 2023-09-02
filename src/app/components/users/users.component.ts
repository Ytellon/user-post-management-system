import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'; 
import { User } from '../model/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersService: UsersService;

  users: User[] = [];

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  ngOnInit() {

    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }
}
