export interface Post {
  id:number;
  user_id: number;
  title: string;
  body: string;
}

export interface CreatePost {
  user_id: number;
  title: string;
  body: string;
}