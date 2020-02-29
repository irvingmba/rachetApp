import io from "socket.io-client";

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

export enum EsocketTypes {
  sendMsg = "message"
};

export interface IpayloadSocket {
  socketType: EsocketTypes;
  [x: string]: string;
};

export function socketEmitNAck(socket: SocketIOClient.Socket, payload:IpayloadSocket,fn?:Function) {
  if(fn) {
    socket.emit(payload.socketType, payload, fn)
  }
  else{
    socket.emit(payload.socketType, payload);
  };
  return ;
};