import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from "../models/post.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable()
export class PostsService{
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    addNewComment(postComment: {comment: string, postId: number}){
        console.log(postComment)
    }
}