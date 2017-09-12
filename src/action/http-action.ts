import * as C from "../core/post-action-const";
import {Post} from "../model/post";

export const Loading = () => ({
  type: C.LOADING
});

export const LoadingCompleted = () => ({
  type: C.LOADING_COMPLETED
});

