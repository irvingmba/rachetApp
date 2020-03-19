import { EsocketTypes } from "../../requests/socketio/socket";
import { ICurrentChat, eKind, Iplayers } from "../redux/reducers";

/* Constants for asynchronous action types*/
// Login
export const ASYNC_LOGIN = "ASYNC_LOGIN";
// Contacts
export const ASYNC_CONTACTS = "ASYNC_CONTACTS";
export const SUB_ADD_CONTACT = "SUB_ADD_CONTACT";
export const SUB_GET_CONTACTS = "SUB_GET_CONTACTS";
// Conversations
export const ASYNC_MSGS = "ASYNC_MSGS";
export const SUB_MSGS_SEND = "SUB_MSGS_SEND";
export const SOCKET_INIT = "SOCKET_INIT";
export const SUB_NEW_CONVO = "SUB_NEW_CONVO";
export const SUB_JOIN2ROOM = "SUB_JOIN2ROOM";
// Own profile
export const ASYNC_PROFILE = "ASYNC_PROFILE";

export type asyncContactAction = ReturnType<typeof asyncAddContact>;
interface baseAction {
  type: string;
};

/* ----- ASYNC ACTIONS ------ */

// Login

export function asyncLogin(payload: {}) {
  return {
    type: ASYNC_LOGIN,
    payload: {...payload}
  };
};

// Contacts

export function asyncAddContact(payload: {}){
  return {
    type: ASYNC_CONTACTS,
    subtype: SUB_ADD_CONTACT,
    payload
  };
};

export function asyncGetContacts(payload:{}){
  const props = {
    subtype: SUB_GET_CONTACTS,
    payload
  };
  return addProps2Action(props)(ASYNC_CONTACTS);
};

// Conversations

export function asyncSocketInit() {
  return {
    type: SOCKET_INIT
  };
};

export function asyncSendMsg(payload: IAsyncSendMsg) {
  return {
    type: ASYNC_MSGS,
    subtype: SUB_MSGS_SEND,
    payload: {
      data:{...payload},
      type: "PUSH_MESSAGE",
      socketType: EsocketTypes.sendMsg
    }
  };
};

interface IAsyncSendMsg {
  user: {
    username: string;
    email?: string;
  } | unknown;
  message: string;
  currentChat: ICurrentChat;
};

export function asyncNewConvo(payload:InAsyncNewConvo) {
  return {
    type: ASYNC_MSGS,
    subtype: SUB_NEW_CONVO,
    payload: {
      data:{...payload},
      type: "ADD_CONVO",
      socketType: EsocketTypes.sendMsg
    }
  };
};

interface InAsyncNewConvo {
  user: {
    username: string;
    email?:string;
  };
  kind: eKind;
  chatName: string;
  member: Iplayers[];
  message: string|null;
};

export function asyncJoinRoom(payload: InAsyncJ2Room) {
  return {
    type: ASYNC_MSGS,
    subtype: SUB_JOIN2ROOM,
    payload:{
      type: "JOIN_ROOM",
      socketType: EsocketTypes.sendMsg,
      data: {
        ...payload
      },
    }
  };
};

interface InAsyncJ2Room {
  room: string;
};

// Basic information

export function asyncOwnProfile(payload:{}) {
  return {
    type: ASYNC_PROFILE,
    payload: {...payload}
  };
};

/* ------ LOCAL FUNCTIONS --------- */

function makeBasicAction(type:string){
  return {
    type
  };
};

function addProps2Action(props: {}) {
  return function (type:string){
    return {...props, ...makeBasicAction(type)};
  };
};