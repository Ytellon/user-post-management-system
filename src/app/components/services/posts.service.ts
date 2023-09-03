import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePost, Post } from '../model/post.interface';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly APIPOST = `${environment.apiUrl}/posts`;
  private readonly APIUSER = `${environment.apiUrl}/users`;
  private readonly TOKEN = `${environment.TOKEN}`;

  constructor(private http: HttpClient) {}

  getPosts(page: number, perPage: number): Observable<any> {
    const params = { page: page.toString(), per_page: perPage.toString() };
    return this.http.get<any>(this.APIPOST, {
      params,
      observe: 'response',
    });
  }

  searchUserByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.APIUSER}?name=${name}`);
  }

  searchPosts(searchTerm: string, searchBy: string): Observable<any> {
    if (searchBy === 'user') {
      return this.http.get<any>(
        `${environment.apiUrl}/users?name=${searchTerm}`,
        { observe: 'response' }
      );
    } else {
      const params = { [searchBy]: searchTerm };
      return this.http.get<any>(this.APIPOST, { params, observe: 'response' });
    }
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.APIPOST}/${id}`);
  }

  getPostByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.APIUSER}/${userId}/posts`, {
      observe: 'response',
    });
  }

  createPost(post: CreatePost): Observable<Post> {
    return this.http.post<Post>(this.APIPOST, post, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`,
      },
    });
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.APIPOST}/${post.id}`, post, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`,
      },
    });
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.APIPOST}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`,
      },
    });
  }
}
