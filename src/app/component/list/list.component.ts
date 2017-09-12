import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Post} from "../../../model/post";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import {PostState} from "../../../reducer/post-reducer";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postState$: Observable<PostState>;

  posts: Array<Post> = [];

  private postSubscription: Subscription;

  constructor(private store: Store<any>) {
    this.postState$ = store.select("postTag");
  }

  ngOnInit() {
    this.postSubscription = this.postState$.subscribe((data) => {
      this.posts = data.posts;
    });
  }

}
