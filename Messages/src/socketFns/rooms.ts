import {Socket, Server} from "socket.io";
import { extractIds } from "./customFns";
import { IMdUserActions } from "../DBmessages/types";

// Interfaces and types

interface IfIdObj {
  id: string;
};

// Exported functions

export function joinRoomsOfQry(socket: Socket, data: IfIdObj[]| null) {
  if(!data) return null;
  const idArray = extractIds(data);
  const joined = joinToRooms(socket, idArray);
  return joined;
};

export function onlineMsg2All(socket: Socket, data:IfIdObj | null) {
  const uniqueId = getIdStr(data)
  if(!uniqueId) return null;
  brdOnlineSt(socket, uniqueId);
};

export function svr2RoomOn(io: Server) {
  return function roomOn(room?: string | null) {
    return function(listener:( socket: Socket ) => void ) {
      if(!room){
        io.on("connection",listener);
        return;
      };
      io.to(room).on("connection",listener);
      return;
    };
  };
};

export function createUsrRoom(io: Server, idObj: IfIdObj | null) {
  const id = getIdStr(idObj)
  if(!id) return getIo(io)();
  return getIo(io)(id);
};

export function getIdStr(idObj:IfIdObj | null) {
  if(!idObj) return null;
  return idObj.id;
};

export const join2ConvoRooms = joinToAnyRoom(joinToRooms, extractConvoId)

// ------- LOCAL FUNCTIONS ----------

function joinToRooms(socket:Socket, rooms: string[]|null) {
  if(!rooms) return false;
  for (let room of rooms){
    socket.join(room);
  };
  return true;
};

function brdOnlineSt(socket: Socket, idUser: string) {
  const rooms = socket.rooms;
  for(let id in rooms){
    socket.to(rooms[id]).emit("notifOnline", idUser);;
  };
  return;
};

function getIo(io: Server){
  return function getRoom(room?:string) {
    return function getEntireEvent(event: string, payload: unknown, ack?: Function) {
      if(!room){
        io.emit(event, payload, ack);
        return;
      };
      io.to(room).emit(event, payload, ack);
    };
  };
};

function extractConvoId(action: IMdUserActions) {
  const convos = action.IDconversations;
  return convos;
};

function joinToAnyRoom(joiner: typeof joinToRooms, extractor: Function) {
  return  function(socket: Socket, action: unknown) {
    return joiner(socket, extractor(action))
  };
};
