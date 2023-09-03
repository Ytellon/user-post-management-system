import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserPost } from '../model/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API = `${environment.apiUrl}/users`
  private readonly TOKEN = `${environment.TOKEN}`
  
  constructor(private http: HttpClient) { }

  getUsers(page: number, perPage: number): Observable<any> {
    const params = { page: page.toString(), per_page: perPage.toString() };
    return this.http.get<any>(this.API, { params, observe: 'response'});
  }

  searchUsers(searchTerm: string, searchBy: string): Observable<any> {
  const params = { [searchBy]: searchTerm };
  return this.http.get<any>(this.API, { params, observe: 'response' });
}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  createUser(user: UserPost): Observable<User> {
    return this.http.post<User>(this.API, user, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API}/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }
}
