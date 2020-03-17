import { IconversationList, eKind } from "./reducers";
import { ISelUserMsg } from "./actionCreators";

function createConversation() {
  const conversationObj = {
    messages: [],
    participants: [],
    update: "",
    notSent: 0,
    chatName: ""
  };
  return conversationObj;
};

export function findConvoByUsr( user: ISelUserMsg, list?: IconversationList[]) {
  const found = list && list.find(
    function (convo) {
      const member = convo.members.find((member)=>member.username===user.username);
      if(convo.kind === eKind.simple && member) {
        return true;
      };
      return false;
    }
  );
  if(!found) throw "Found a conflict while searching in the conversation list";
  return found ? found : null;
};