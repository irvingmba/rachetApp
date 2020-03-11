import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { ASYNC_MSGS, SUB_MSGS_SEND, SOCKET_INIT, SUB_NEW_CONVO } from "./asyncActions";
import { socketConnect, socketEmitNAck, socketSubscribe, socketListener } from "../../requests/socketio/socket";

export function* sagaConversation() {
  try {
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
        case SUB_NEW_CONVO:
          yield call(socketEmitNAck, socket, action.payload);
          break;
        default:
          break;
      };
    };
  } catch (error) {
    console.error(error);
    console.error("Something bad happened while processing the conversation saga");
  };
};

