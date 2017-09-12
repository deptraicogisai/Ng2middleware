import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgProgressService} from "ngx-progressbar";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../../../statemangement/ApplicationState";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  fetchState$: Observable<ApplicationState>;

  private fetchSubscription: Subscription;

  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    positionUsing: 'translate',
    speed: 200,
    trickleSpeed: 300,
    showSpinner: true,
    direction: "leftToRightReduced",
    color: '#CC181E',
    thick: false
  };

  directions = [
    'leftToRightIncreased',
    'rightToLeftIncreased',
    'leftToRightReduced',
    'rightToLeftReduced'
  ];

  positionMethods = [
    'margin',
    'translate3d',
    'translate'
  ];

  toggle;

  constructor(public progress: NgProgressService, store: Store<any>) {
    this.fetchState$ = store.select('fetchTag');
  }

  ngOnInit() {
    this.fetchSubscription = this.fetchState$.subscribe((data) => {
      if (data.isLoading) {
        this.start();
      } else {
        this.done();
      }
    });
  }

  start() {
    this.progress.start();
    this.toggle = true;
  }

  done() {
    this.progress.done();
    this.toggle = false;
  }

}
