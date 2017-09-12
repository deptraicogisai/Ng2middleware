import {Component, OnInit} from '@angular/core';
import {PostState} from "../reducer/post-reducer";
import {Store} from "@ngrx/store";
import {GetData , CallMidleWare} from "../action/post-action";
import {FetchService} from "./service/fetch/fetch.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'

  constructor(private store: Store<PostState>, private service: FetchService) {
  }

  ngOnInit() {

    this.store.dispatch(CallMidleWare())

    this.store.dispatch(GetData());

    this.service.getComments().subscribe(data => {

    });
  }
}
