import { eventChannel } from "redux-saga";
import { put, call } from "redux-saga/effects";
import io from "socket.io-client";
import { actionPushMsg, actionNewConvo } from "../../StateManagement/redux/actionCreators";
import { IconversationList } from "../../StateManagement/redux/reducers";
import { changeConvo, changeMessage, getConvoId } from "./conversation";
import { asyncJoinRoom } from "../../StateManagement/reduxSaga/asyncActions";

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

    socket.on("message", function(data:{}){
      emit(data);
    });

    socket.on("ack", function(data:{}){
      console.log("channel event ack",data);
      emit(data);
    });

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
  PUSH_MESSAGE: {
    action: actionPushMsg,
    payload: changeMessage
  },
  NEW_CONVO: {
    action: actionNewConvo,
    payload: changeConvo
  },
  ADD_CONVO: {
    action: actionNewConvo,
    payload: changeConvo
  },
};

export function* socketListener(action:ISocketAction){
  switch (action.type){
    case "NEW_CONVO":
      yield put(event2Action.NEW_CONVO.action(event2Action.NEW_CONVO.payload(action.data)));
      break;
    case "PUSH_MESSAGE":
      yield put(event2Action.PUSH_MESSAGE.action(event2Action.PUSH_MESSAGE.payload(action)));
      break;
    case "ADD_CONVO":
      const changedConvo = yield call(event2Action.ADD_CONVO.payload, action.data)
      yield put(event2Action.ADD_CONVO.action(changedConvo));
      const roomId = yield call(getConvoId, changedConvo);
      yield put(asyncJoinRoom({room: roomId}))
      break;
  };
};