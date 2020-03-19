import React from "react";
import { connect } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";
import { dispatch } from "../../../reduxSaga";
import { actionSelUserMsg } from "../../../StateManagement/redux/actionCreators";

/* ------------- FUNCTIONS ------------ */

export interface InOwnData {
  username?: string;
  email?: string;
};

function list2Comp(list: IConvList[]|null, ownData: InOwnData) {
  if(!list){
    return null;
  };
  const compList = list
  .reduce(
    function(acc:JSX.Element[], contact, index){
      const name = contact.chatName || contact.participants.find(
        function(user){return user.username != ownData.username}
      )?.username;
      const comp = <li
      key={index.toString()}
      data-username={name}
      >
        {name}
      </li>
      return [...acc,comp];
    }, []
  );
    return compList
};

function handleClick(event:React.MouseEvent<HTMLUListElement, MouseEvent>) {
  const target = event.target;
  if("dataset" in target){
    const username = target["dataset"]["username"];
    dispatch(actionSelUserMsg({username}))
    return username || null;
  };
  return null;
};

/* ------------ REACT COMPONENT --------------- */
function ConversationList(data: Tprops){
  const {conversationList, ownData} = data;
  const conversations = list2Comp(conversationList, ownData);

  return (
    <>
    <h1>Conversations</h1>
    {
    conversations ? 
    <ul onClick={handleClick}>
      {conversations}
    </ul>
    : 
    <p>Empty list</p>
    }
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