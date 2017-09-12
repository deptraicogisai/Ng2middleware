import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ActionReducer, State, Store, StoreModule} from "@ngrx/store";
import {postReducer} from "../reducer/post-reducer";
import {FetchService} from 'app/service/fetch/fetch.service';
import {ListComponent} from './component/list/list.component';
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {httpFactory} from "./custom/CustomHttp";
import {requestReducer} from "../reducer/request-reducer";
import {NgProgressModule} from "ngx-progressbar";
import {ProgressComponent} from './component/progress/progress.component';
import {EffectsModule} from "@ngrx/effects";
import {MainEffects} from "../middleware/MainEffects";

export function logger(reducer) {
  return function (state, action) {
    console.group(action.type);
    const nextState = reducer(state, action);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
    console.groupEnd();
    return nextState;
  }
}

export const metaReducers = [logger];

const reducers = {postTag: postReducer, fetchTag: requestReducer}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgProgressModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([MainEffects])
  ],
  providers: [FetchService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
