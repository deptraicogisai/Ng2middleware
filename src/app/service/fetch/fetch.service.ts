import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import "rxjs/add/operator/map"
import {Observable} from "rxjs/Observable";
import {Post} from "../../../model/post";

@Injectable()
export class FetchService {

  constructor(private http: Http) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get("https://jsonplaceholder.typicode.com/posts")
      .map(res => {
        return <Post[]>res.json();
      });
  }

  getComments(): Observable<Comment[]> {

    setTimeout(() => {

    }, 5000);

    return this.http.get("https://jsonplaceholder.typicode.com/comments")
      .map(res => {
        return <Comment[]>res.json();
      });
  }

}
