import { eventChannel } from "redux-saga";
import { put, call } from "redux-saga/effects";
import io from "socket.io-client";
import { actionPushMsg, actionNewConvo } from "../../StateManagement/redux/actionCreators";
import { IconversationList } from "../../StateManagement/redux/reducers";
import { changeConvo } from "./conversation";

/* ----- Interfaces ------- */

export enum EsocketTypes {
  sendMsg = "message"
};

export interface IpayloadSocket {
  socketType: EsocketTypes;
  [x: string]: string;
};

export function socketConnect() {
  const ioOptions:SocketIOClient.ConnectOpts = {
    path: "/conversation",
  };
  const uri = "https://localhost:3000";
  
  return new Promise(function(res,err) {
    const socket = io.connect(uri,ioOptions);
    res(socket);
  });
};

export function socketEmitNAck(socket: SocketIOClient.Socket, payload:IpayloadSocket,fn?:Function) {
  if(fn) {
    socket.emit(payload.socketType, payload, fn)
  }
  else{
    socket.emit(payload.socketType,  payload);
  };
  return;
};

// Socket.io subscription function

export function* socketSubscribe(socket:SocketIOClient.Socket) {
  return eventChannel(function channel(emit) {

    socket.on("this",console.log);

    socket.on("message", console.log);

    socket.on("ack", function(data:{}){
      emit(data);
    });

    // socket.on("response",function(resp:IMessage){
    //   emit(actionPushMsg(resp));
    // });

    // socket.on("newConvo",function(obj:IconversationList){
    //   if(obj) emit(actionNewConvo(obj));
    // });

    socket.on("notifOnline", function(msg:unknown){
      console.log(msg);
    });

    socket.on("update", function(event:string, data: unknown){
      console.log(event, data);
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
  type: TpEvt2Act;
  [x:string]: any;
};

export type TpEvt2Act = keyof typeof event2Action;

const event2Action = {
  // PUSH_MESSAGE: actionPushMsg,
  NEW_CONVO: {
    action: actionNewConvo,
    payload: changeConvo
  }
};

export function* socketListener(action:ISocketAction){
  yield call(console.log, action);
  yield put(event2Action[action.type]["action"](event2Action[action.type]["payload"](action)))
  // yield put(actionNewConvo(action));
  // yield put(action);
};