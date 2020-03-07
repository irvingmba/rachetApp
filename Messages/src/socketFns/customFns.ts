import { Socket } from "socket.io";

export function extractIds<T>(qryArray:{id:T;}[]|null) {
  if(!qryArray) return null;
  const ids = qryArray.reduce<T[]>(
    function(accIds, idObj){

      return accIds.concat(idObj.id);
    }, []
  );
  return ids;
};

export function updateSocket(socket:Socket) {
  return function event2Socket(event: string) {
    return function data2Socket(data: unknown){
      socket.emit("update",event, data);
    };
  };
};
