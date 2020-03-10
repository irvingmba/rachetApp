import { createNewMessage, pushMessage, createNewConversation, pushConversation } from "../../../DBmessages/functions";
import { ISmMessages, IMdConversations, IMdUserActions, ISmConversations, Ekind, ISmParticipants } from "../../../DBmessages/types";
import { Types } from "mongoose";
import { Socket, Server } from "socket.io";
import { Children } from "react";

/* ----- Interfaces for requests coming from the client ------ */

interface InLtnrPayload {
  type: TpPayloadType;
  data: InPushMessages | InNewConvo;
};

interface InLtnrParams {
  ownId: string | null;
  contacts: (reload?: boolean | undefined) => Promise<any>;
  action: (reload?: boolean | undefined) => Promise<IMdUserActions>;
  convos: (reload?: boolean | undefined) => Promise<(IMdConversations | null)[]>;
};

interface InPushMessages {
  user: InClientUser;
  message: string;
  currentChat: InClientChat;
};

interface InNewConvo {
  user: InClientUser;
  kind: TpConvoKind;
  chatName: string;
  member: InClientUser[];
  message: string|null;
};

interface  InClientUser{
  username: string;
  email?: string;
};

interface InClientChat{
  id:string|null;
  members?: InClientUser[];
  kind?: TpConvoKind;
};

interface InRespEvent {
  type: TpPayloadType;
};

type TpConvoKind = "simple" | "group";

type TpPayloadType = keyof typeof eventFnTypes;

/* ------ Interfaces for database requests ------ */

interface InDBContact {
  id: string;
  nickname: string;
  email: string;
};

/* ----- Functions for listeners */

const eventFnTypes = {
  PUSH_MESSAGE: eventPushMsg,
  NEW_CONVO: eventNewConvo
};

export function listenMessage(payload: InLtnrPayload & InLtnrParams) {
  return eventFnTypes[payload.type](payload);
};

async function eventPushMsg(payload: InLtnrPayload & InLtnrParams){
  const message = payload.data as InPushMessages;
  if (!message.currentChat.id && !payload.ownId) throw "Not enough data to execute event";
  const objMsg = clientMsg2DBObj(message, payload.ownId || "");
  const docMsg = await createNewMessage(objMsg)
  const docConvo = await pushMessage(message.currentChat.id || "", docMsg.id);
  if(!docMsg || !docConvo) return null;
  return {
    type: payload.type,
    chatId: docConvo.id,
    message: message.message,
    username: message.user.username,
    date: docMsg.createdAt
  };
};


async function eventNewConvo(payload: InLtnrPayload & InLtnrParams){
  const convoData = payload.data as InNewConvo;
  const contacts:InDBContact[] = await payload.contacts();
  const convo2DB:ISmConversations = {
    chatName: convoData.chatName,
    kind: convoData.kind as Ekind,
    messages: [],
    updated: 0,
    participants: convoData.member.reduce(
      function getContactInfo(acc: ISmParticipants[], member){
        if(member.username !== convoData.user.username){
          const chatMembers = contacts.find(
            function findContactData(contact) {
              if (contact.nickname === member.username) return true;
              return false;
            }
          );
          const participant = {
            IDUser: Types.ObjectId(chatMembers?.id),
            username: member.username
          }
          return acc.concat(participant);
        };
      const participant = {
        IDUser: Types.ObjectId(payload.ownId||undefined),
        username: member.username
      }
        return acc.concat(participant);
      }, []
    )
  };
  const createdConvo = await createNewConversation(convo2DB);
  if(convoData.message === null) return createdConvo;
  const msgObj = {
    user: convoData.user,
    message: convoData.message,
    currentChat: {id: createdConvo.id}
  };
  const pushedMsg = await eventPushMsg({...payload,data:{...payload.data, ...msgObj}});
  const action = await payload.action();
  const pushedConvo = await pushConversation(action.id, pushedMsg?.chatId);
  const convos = await payload.convos(true);
  const genedConvo = convos.find(
    function(convo) {
      if(convo?.id === createdConvo.id) return true;
      return false;
    }
  );
  return {
    type: payload.type,
    ownId: payload.ownId,
    id: genedConvo?.id,
    members: genedConvo?.participants.map(
      function(member) {
        return {
          IDUser: member.IDUser,
          username: member.username
        };
      }
    ),
    messages: [{
      username: pushedMsg?.username,
      msg: pushedMsg?.message,
      date: pushedMsg?.date
    }],
    updated: genedConvo?.updated,
    kind: genedConvo?.kind,
    chatName: genedConvo?.chatName
  };
};

function clientMsg2DBObj(message: InPushMessages, ownId: string) {
  const dbObj:ISmMessages = {
    IDUser: Types.ObjectId(ownId),
    message: message.message,
    createdAt: (new Date()).getTime()
  };
  return dbObj;
};

const respFnTypes = {
  PUSH_MESSAGE: respPushMsg,
  NEW_CONVO: respNewConvo
};

export function ackResponse(socket:Socket, eventObj: any, io: Server) {
  const {type} = eventObj as InRespEvent
  return respFnTypes[type](socket ,eventObj, io);
};

function respPushMsg(socket:Socket, eventObj:ThenArg<ReturnType<typeof eventPushMsg>>, io?: Server) {
  if(!eventObj || !("type" in eventObj)) return false;
  const room = "chatId" in eventObj ? eventObj["chatId"] : null;
  if(!room) return false;
  socket.to(room).emit("ack", eventObj);
  return true;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

function respNewConvo(socket:Socket, eventObj: ThenArg<ReturnType<typeof eventNewConvo>>, io: Server) {
  if(!("type" in eventObj)) return false;
  const createdRoom = eventObj.id;
  const members = eventObj.members?.reduce(
    function getMembersId(acc: string[], member) {
      return acc.concat(member.IDUser.toHexString());
    }, []
  );
  if(!createdRoom || !members) return false;
  const depuredObj = {
    type: eventObj.type,
    id: eventObj.id,
    members: eventObj.members?.map(
      function(member){
        return {
          username: member.username
        };
      }
    ),
    messages: eventObj.messages,
    updated: eventObj.updated,
    kind: eventObj.kind,
    chatName: eventObj.chatName
  };
  socket.join(createdRoom);
  for(const member of members){
    if(member === eventObj.ownId) socket.emit("ack",depuredObj);
    socket.to(member).emit("ack",depuredObj);
  };
  return true;
};