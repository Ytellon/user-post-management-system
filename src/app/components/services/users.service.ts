import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = `${environment.apiUrl}/users`
  private readonly TOKEN = `${environment.TOKEN}`
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API, user, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }
}
