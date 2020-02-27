import { take, call, put } from "redux-saga/effects";
import { ASYNC_MSGS, SUB_MSGS_SEND } from "./asyncActions";

export function* sagaConversation() {
  while(true){
    const action = yield take(ASYNC_MSGS);
    switch(action.subtype){
      case SUB_MSGS_SEND:
        yield call(console.log,SUB_MSGS_SEND);
        break;
      default:
        yield call(console.log, "default");
    };
  };
};