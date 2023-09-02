import { Component } from '@angular/core';
import { UserPost } from '../../model/user.interface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: UserPost = {
    name: '',
    email: '',
    gender: '',
    status: ''
  }


  constructor(private usersService: UsersService, private router: Router) {}


  onSubmit() {
    this.usersService.createUser(this.user).subscribe((newUser: UserPost) => {
      this.router.navigate(['/users']);
    });
  }
}

