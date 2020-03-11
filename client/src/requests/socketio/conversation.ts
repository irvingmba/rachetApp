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

