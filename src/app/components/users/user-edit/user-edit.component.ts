import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { User, UserPost } from '../../model/user.interface'; 
import { UsersService } from '../../services/users.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: ''
  };

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : 0;

    this.usersService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
    });
  } 

  onSubmit() {
    this.usersService.editUser(this.user).subscribe((updatedUser: User) => {
      this.router.navigate(['/users']);
    });
  }
}


