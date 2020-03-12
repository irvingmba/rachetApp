import React from "react";
import { connect } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";

/* ------------- FUNCTIONS ------------ */

export interface InOwnData {
  username?: string;
  email?: string;
};

function list2Comp(list: IConvList[]|null, ownData: InOwnData) {
  if(!list){
    return (
    <p>{"List empty"}</p>
    );
  };
  const compList = list
  .reduce(
    function(acc:JSX.Element[], contact, index){
      const name = contact.chatName || contact.participants.find(
        function(user){return user.username != ownData.username}
      )?.username;
      const comp = <li
      key={index.toString()}
      >
        {name}
      </li>
      return [...acc,comp];
    }, []
  );
    return compList
};

/* ------------ REACT COMPONENT --------------- */
function ConversationList(data: Tprops){
  const {conversationList, ownData} = data;
  const conversations = list2Comp(conversationList, ownData);

  return (
    <>
    <h5>Conversations</h5>
    <ul>
    {conversations}
    </ul>
    </>
  );
};

type Tprops = ReturnType<typeof mapStateToProps>;

/* ------- REDUX FUNCTIONS -------- */

function mapStateToProps(state: typeRootState) {
  return {
    conversationList: getConversationList(state),
    ownData: getOwnData(state)
  };
};

function getOwnData(state: typeRootState) {
  const ownData = {
    username: state.login.user,
    email: state.login.email
  };
  return ownData;
};

function getConversationList(state: typeRootState) {
  const convos = state.conversations;
  const convList = convos && convos.conversationList;
  if(convList){
    const list = convList.reduce(
      function(acc:IConvList[], val){
        const participants = val.members;
        const chatName = val.chatName;
        const update = val.updated;
        return acc.concat({
          participants,
          chatName,
          update
        });
      }, []
    )
    .sort(function(val1, val2){
      return val1.update - val2.update;
    })
    // .reduce(function (acc: TConvListElem[], val, index){
    //   const listElement = <ConvListElem 
    //   key={index.toString()}
    //   chatName={val.chatName}
    //   participants={val.participants}
    //   update={val.update}
    //   />;
    //   return acc.concat(listElement);
    // }, []);
    return list;
  };
  return null;
};

interface IConvList {
  participants: {
    username: string
  }[],
  chatName: string;
  update: number
};

const ConnConversationList = connect(mapStateToProps)(ConversationList);

export default ConnConversationList;