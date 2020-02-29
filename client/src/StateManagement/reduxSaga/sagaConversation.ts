import { eventChannel} from "redux-saga";
import { take, call, put, fork, takeEvery } from "redux-saga/effects";
import { ASYNC_MSGS, SUB_MSGS_SEND, SOCKET_INIT } from "./asyncActions";
import { socketConnect, socketEmitNAck } from "../../requests/socketio/socket";
import { actionPushMsg, IActPushMsg } from "../redux/actionCreators";

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
        yield call(socketEmitNAck, socket, action.payload, ackSendMsg);
        break;
      default:
        break;
    };
  };
};

// Socket.io subscription function

function* socketSubscribe(socket:SocketIOClient.Socket) {
  return eventChannel(function channel(emit) {

    socket.on("this",console.log);

    socket.on("response",function(resp:IMessage){
      emit(actionPushMsg(resp));
    });
    
    return function disconnect(){
      return socket.close();
    };
  });
};

interface IMessage {
  username: string;
  msg: string;
  lastDate: Date;
  updateDate: Date;
};

// Function that hears the asynchronous channel operations

interface ISocketAction {
  type: string;
  payload: {};
};

function* socketListener(action:ISocketAction){
  yield call(console.log, action)
  yield put(action);
};

// Functions for ack from the server

function ackSendMsg(response: {}){
  console.log(response)
};
