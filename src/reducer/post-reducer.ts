import {Post} from "../model/post";
import * as C from "../core/post-action-const";

export interface PostState {
  posts?: Post[]
}

export function postReducer(state: PostState = {}, action) {
  switch (action.type) {
    case C.POST_GET_DATA_COMPLETED:
      const {posts} = action;
      return {...state, posts};
    case C.CALL_MIDDLEWARE_COMPLETED:
      return state;
  }

  return state;
}
