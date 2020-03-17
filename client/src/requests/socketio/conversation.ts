import { TpEvt2Act } from "./socket";
import { eKind, IconversationList } from "../../StateManagement/redux/reducers";


interface InSvrConvo {
  type: TpEvt2Act;
    id: string;
    members: {
      username: string;
    }[];
    messages:{
      username: string;
      msg: string;
      date: number;
    }[];
    updated: number;
    kind: eKind;
    chatName: string;
};

export function changeConvo(svrConvo:any) {
  if(Array.isArray(svrConvo)){
    const convoArray = svrConvo.map(
      function(convo) {
        const newConvo = {
          id: convo.id,
          members: convo.members,
          messages: convo.messages,
          notSent: 0,
          updated: convo.updated,
          kind: convo.kind,
          chatName: convo.chatName
        };
        return newConvo;
      }
      );
      console.log("Convo from server",svrConvo, convoArray);
    return convoArray;
  };
  const convo2St:IconversationList = {
    id: svrConvo.id,
    members: svrConvo.members,
    messages: svrConvo.messages,
    notSent: 0,
    updated: svrConvo.updated,
    kind: svrConvo.kind,
    chatName: svrConvo.chatName
  };
  return convo2St;
};

