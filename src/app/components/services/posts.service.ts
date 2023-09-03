import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePost, Post } from '../model/post.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly API = `${environment.apiUrl}/posts`
  private readonly TOKEN = `${environment.TOKEN}`

  constructor(private http: HttpClient) { }

  getPosts(page: number, perPage: number): Observable<any> {
    const params = { page: page.toString(), per_page: perPage.toString() };
    return this.http.get<any>(this.API, {
      params, observe: 'response'
    });
  }

  searchPosts(searchTerm: string, searchBy: string): Observable<any> {
    const params = { [searchBy]: searchTerm };
    return this.http.get<any>(this.API, { params, observe: 'response' });
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API}/${id}`);
  }

  createPost(post: CreatePost): Observable<Post> {
    return this.http.post<Post>(this.API, post, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.API}/${post.id}`, post, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.API}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`
      }
    });
  }

}
