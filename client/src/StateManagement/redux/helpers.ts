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
  console.log("In the helper\n",list);
  const found = list?.length && list.find(
    function (convo) {
      const member = convo.members.find((selUser)=>selUser.username===user.username);
      console.log("in the loop\n", member, user.username,convo.kind);
      if(convo.kind === eKind.simple && member) {
        return true;
      };
      return false;
    }
  );
  return found ? found : null;
};