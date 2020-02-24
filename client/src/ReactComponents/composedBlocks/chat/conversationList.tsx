import React from "react";
import { connect } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";
import ConvListElem, { TConvListElem } from "../../components/chat/listElement";

/* ------------- FUNCTIONS ------------ */


/* ------------ REACT COMPONENT --------------- */
function ConversationList(data: Tprops){
  const {conversationList} = data;

  return (
    <>
    <h5>Conversations</h5>
    <ul>
    {conversationList}
    </ul>
    </>
  );
};

type Tprops = ReturnType<typeof mapStateToProps>;

/* ------- REDUX FUNCTIONS -------- */

function mapStateToProps(state: typeRootState) {
  return {
    conversationList: getConversationList(state)

  };
};

function getConversationList(state: typeRootState) {
  const convList = state.conversations.conversationList;
  if(convList){
    const list = convList.reduce(
      function(acc:IConvList[], val){
        const participants = val.participants;
        const chatName = val.chatName;
        const update = val.update;
        return acc.concat({
          participants,
          chatName,
          update
        });
      }, []
    ).sort(function(val1, val2){
      return val1.update.getMilliseconds() - val2.update.getMilliseconds();
    }).reduce(function (acc: TConvListElem[], val, index){
      const listElement = <ConvListElem 
      key={index.toString()}
      chatName={val.chatName}
      participants={val.participants}
      update={val.update}
      />;
      return acc.concat(listElement);
    }, []);
    return convList;
  };
  return null;
};

interface IConvList {
  participants: {
    username: string
  }[],
  chatName: string;
  update: Date
};

const ConnConversationList = connect(mapStateToProps)(ConversationList);

export default ConnConversationList;