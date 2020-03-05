import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { ASYNC_MSGS, SUB_MSGS_SEND, SOCKET_INIT } from "./asyncActions";
import { socketConnect, socketEmitNAck, socketSubscribe, socketListener } from "../../requests/socketio/socket";

export function* sagaConversation() {
  yield take(SOCKET_INIT);
  const socket = yield call(socketConnect);
  const channel = yield call(socketSubscribe, socket);
  yield takeEvery(channel,socketListener);
  while(true){
    const action = yield take(ASYNC_MSGS);
    switch(action.subtype) {
      case SUB_MSGS_SEND:
        if(!action.payload.message) break;
        yield call(socketEmitNAck, socket, action.payload);
        break;
      default:
        break;
    };
  };
};

