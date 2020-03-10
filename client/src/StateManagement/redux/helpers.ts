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
  const found = list && list.filter(
    function (convo) {
      if(convo.kind === eKind.simple && convo.members[0].username === user.username) {
        return true;
      };
      return false;
    }
  );
  if(found && found.length > 1) throw "Found a conflict while searching in the conversation list";
  return found ? found[0] : null;
};