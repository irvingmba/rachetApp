import { getConversation } from "../../DBmessages/functions"

export function ackSendMessage(reqClient:IReqClient) {
  const id = reqClient.currentChat.id;
  if(id){
    const convo = getConversation(id);
  };
  return buildConversation(reqClient);
};

enum eSvrConvoKind {
  single = "single",
  group = "group"
};

interface IReqClient {
  user: {
    username: string;
    email?: string;
  };
  message: string;
  currentChat: {
    id: string | null;
    members?: {
      username:string;
      email?:string;
    };
    kind: eSvrConvoKind;
  };
};

function buildConversation(client:IReqClient) {
  const convo:IfNewConvoShp = {
    id: Math.trunc(Math.random()*100).toString(),
    messages:[{
      message: client.message,
      username: client.user.username,
      date: new Date()
    }],
    participants: [{
      username:client.user.username
    }, {
      username: client.currentChat.members?.username || "",
    }],
    updated: new Date(),
    kind: eSvrConvoKind.single
  };
  return convo;
};

interface IfNewConvoShp {
  id: string;
  messages: IfMsgs[];
  participants: IfMem[];
  updated: Date;
  kind: eSvrConvoKind;
};

interface IfMsgs {
  username: string;
  message: string;
  date: Date;
};

interface IfMem {
  username: string;
};