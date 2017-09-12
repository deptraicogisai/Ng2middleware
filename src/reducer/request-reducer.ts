import * as C from "../core/post-action-const";
import {ApplicationState} from "../statemangement/ApplicationState";

export function requestReducer(state: ApplicationState = {isLoading: false}, action) {
  switch (action.type) {
    case C.LOADING:
      return {...state, isLoading: true};
    case C.LOADING_COMPLETED:
      return {...state, isLoading: false};
  }

  return state;
}
