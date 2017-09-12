import * as C from "../core/post-action-const";
import {Post} from "../model/post";

export const GetData = () => ({
  type: C.POST_GET_DATA
});

export const CallMidleWare = () => ({
  type: C.CALL_MIDDLEWARE
});


