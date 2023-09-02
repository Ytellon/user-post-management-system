import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly API = `${environment.apiUrl}/posts`
  private readonly TOKEN = `${environment.TOKEN}`


  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API);
  }

  createPost(post: Post): Observable<Post> {
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
