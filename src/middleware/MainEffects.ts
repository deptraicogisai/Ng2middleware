import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as C from '../core/post-action-const';
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {FetchService} from "../app/service/fetch/fetch.service";

@Injectable()
export class MainEffects {

  constructor(private action$: Actions, private service: FetchService) {

  }

  @Effect()
  public fetch$: Observable<Action> = this.action$
    .ofType(C.CALL_MIDDLEWARE)
    .switchMap(() => {
      return Observable.of({type: C.CALL_MIDDLEWARE_COMPLETED})
    });

  @Effect() getPosts$ = this.action$
    .ofType(C.POST_GET_DATA)
    .switchMap(action =>
      this.service.getPosts()
        .map(todos => ({type: C.POST_GET_DATA_COMPLETED, posts: todos}))
        .catch(() => Observable.of({type: C.POST_GET_DATA_COMPLETED})));
}
