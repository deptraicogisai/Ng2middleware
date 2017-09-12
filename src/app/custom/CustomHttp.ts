import {Injectable} from "@angular/core";
import {
  ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers,
  XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../statemangement/ApplicationState";
import {Loading, LoadingCompleted} from "../../action/http-action";

@Injectable()
export class CustomHttp extends Http {

  private activeCalls: number;
  private store: Store<ApplicationState>;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, store: Store<ApplicationState>) {
    super(backend, defaultOptions);
    this.store = store;
    this.activeCalls = 0;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.httpCallRequested();

    return super.get(url, this.getRequestOptionArgs(options)).finally(() => {
      this.httpCallReady();
    });
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.getRequestOptionArgs(options)).finally(() => {
      this.httpCallReady();
    });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');

    return options;
  }

  private httpCallReady(): void {
    this.activeCalls--;
    if (this.activeCalls === 0) {
      this.store.dispatch(LoadingCompleted());
    }
  }

  private httpCallRequested(): void {
    if (this.activeCalls === 0) {
       this.store.dispatch(Loading());
    }
    this.activeCalls++;
  }
}


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, store: Store<ApplicationState>): Http {
  return new CustomHttp(xhrBackend, requestOptions, store);
}
