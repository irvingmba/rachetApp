import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { typeRootState, ICurrentChat, eKind } from "../../../StateManagement/redux/reducers";
import { asyncSendMsg } from "../../../StateManagement/reduxSaga/asyncActions";
import { Dispatch } from "redux";

/* Handling onChange event from input */
function updInput(handler: React.Dispatch<React.SetStateAction<string>>){
  return function handleChangeEvent(event:React.ChangeEvent<HTMLInputElement>){
    const element = onInputChange(event);
    handler(element.value);
    return;
  };
};

function onInputChange(event:React.ChangeEvent<HTMLInputElement>){
  return event.target;
};

/* Handling submit event from input */
function handleSubmit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  return;
};

function genMessage (data:IDataMsg<unknown>){
  if(data.currentChat.id){
    return {
      user: data.user,
      message: data.message,
      currentChat: data.currentChat
    };
  }
  else {
        return {
          user: data.user,
          message: data.message,
          currentChat: {
            ...data.currentChat,
            kind: eKind.single
          }
        };
  };
};

interface IDataMsg<T> {
  user: T;
  message: string;
  currentChat: ICurrentChat;
};

function execSubmit(msg: TMessage, dispatch:Dispatch){
  return function runningSubmit(event:React.FormEvent<HTMLFormElement>){
    handleSubmit(event);
    dispatch(asyncSendMsg(msg));
    return;
  };
};

type TMessage = ReturnType<typeof genMessage>;

interface IMsgFromServer {
  username: string;
  msg: string;
  date: Date;
};

function printMessages(arrMessage: IMsgFromServer[]|null) {
  const arrElements = arrMessage && arrMessage.reduce(
    function print(acc:JSX.Element[], val, index) {
      const liElem = <li
      key={index.toString()}
      >
        <p>{val.username}</p>
        <p>{val.msg}</p>
        <p>{val.date}</p>
      </li>;
      return [liElem].concat(acc);
    }, []
  );
  return arrElements;
};

/* --------------- REACT COMPONENT ----------------------- */
function ConversationWindow({user, chatID, messages}:props){

  const [state, updState] = useState("");
  const dispatch=useDispatch();
  const handleChange = updInput(updState);
  const msg = genMessage({user, message:state, currentChat: chatID});
  const submitMsg = execSubmit(msg, dispatch);
  const renderMsgs = printMessages(messages as IMsgFromServer[]);

  return (
    <>
    <h5>Chat conversation</h5>
      <ul>
      {messages ? renderMsgs :  "The conversation is empty"}
      </ul>
    <form onSubmit={submitMsg}>
      <input type="text" onChange={handleChange} value={state}/>
      <input type="submit" value="Send"/>
    </form>
    </>
  );
};

/* ------------ REDUX FUNCTIONS ----------------- */

function mapStateToProps(state: typeRootState) {
  return {
    user: getOwnUser(state),
    chatID: getChatId(state),
    messages: getMessages(state)
  };
};

type props = ReturnType<typeof mapStateToProps>;

function getOwnUser(state: typeRootState) {
  return {
    username: state.login.user,
    email: state.login.email
  };
};

function getChatId(state:typeRootState) {
  const currentChat =state.conversations?.currentChat; 
  const {id} = currentChat || {id:null};
  if(id) return {id}
  else {
    return {
      id,
      members: state.conversations.toUser,
    };
  };
};

function getMessages(state: typeRootState) {
  const { id } = getChatId(state);
  if(!id) return null;
  const convos = state.conversations.conversationList;
  const theConvo = convos && convos.filter(
    function(convo){
      return convo.id === id;
    }
  )
  .shift();
  const messages = theConvo && theConvo.messages;
  return messages ? messages : null;
};

const ConnConversationWindow = connect(mapStateToProps)(ConversationWindow);

export default ConnConversationWindow;