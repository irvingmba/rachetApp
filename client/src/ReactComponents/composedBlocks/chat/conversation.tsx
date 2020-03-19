import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { typeRootState, ICurrentChat, eKind, Iplayers } from "../../../StateManagement/redux/reducers";
import { asyncSendMsg, asyncNewConvo } from "../../../StateManagement/reduxSaga/asyncActions";
import { Dispatch } from "redux";
import { actionUnkActv } from "../../../StateManagement/redux/actionCreators";

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
            kind: eKind.simple
          }
        };
  };
};

interface IDataMsg<T> {
  user: T;
  message: string;
  currentChat: ICurrentChat;
};

interface convoUser {
  username: string;
  email?:string;
};

function genConvo(data: IDataMsg<convoUser>){
  const convoObj = {
    user: {
      username: data.user.username,
      email:data.user.email
    },
    kind: data.currentChat.kind || eKind.simple,
    chatName: "",
    member: data.currentChat.members || [],
    message: data.message
  };
  return convoObj;
};

function execSubmit(msg: IDataMsg<unknown>|IDataMsg<convoUser>, dispatch:Dispatch){
  return function runningSubmit(event:React.FormEvent<HTMLFormElement>){
    handleSubmit(event);
    if(!msg.currentChat.id) {
      dispatch(asyncNewConvo(genConvo(msg as IDataMsg<convoUser>)));
      return;
    };
    dispatch(asyncSendMsg(msg));
    return;
  };
};

type TMessage = ReturnType<typeof genMessage>;

interface IMsgFromServer {
  username: string;
  msg: string;
  date: number;
};

function printMessages(arrMessage: IMsgFromServer[]|null) {
  if(!arrMessage) return (<p>{"No messages"}</p>);
  const arrElements = arrMessage && arrMessage.reduce(
    function print(acc:JSX.Element[], val, index) {
      const liElem = <li
      key={index.toString()}
      >
        <p>{val.username}</p>
        <p>{val.msg}</p>
        <p>{val.date}</p>
      </li>;
      return acc.concat(liElem);
    }, []
  );
  return arrElements;
};

/* --------------- REACT COMPONENT ----------------------- */
function ConversationWindow({user, chatID, messages, toUser}:props){

  const [state, updState] = useState("");
  const dispatch=useDispatch();
  const handleChange = updInput(updState);
  const msg = genMessage({user, message:state, currentChat: chatID});
  const submitMsg = execSubmit(msg, dispatch);
  const renderMsgs = printMessages(messages as IMsgFromServer[]);
  dispatch(actionUnkActv({}));
  console.log("in the conversation comp", user, chatID, messages);

  return (
    <>
    {
      toUser?.username ?
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
      :
      <p>{"Select a conversation"}</p>
    }
    </>
  );
};

/* ------------ REDUX FUNCTIONS ----------------- */

function mapStateToProps(state: typeRootState) {
  return {
    user: getOwnUser(state),
    chatID: getChatId(state),
    messages: getMessages(state),
    toUser: getNonConvo(state)
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
    const user = getOwnUser(state);
    const userMember = {
      username: user.username || "",
      email: user.email || ""
    };
    return {
      id,
      members: [
        state.conversations.toUser,
        userMember
      ] as Iplayers[],
    };
  };
};

function getMessages(state: typeRootState) {
  const { id } = getChatId(state);
  if(!id) return null;
  const convos = state.conversations.conversationList;
  const theConvo = convos?.length ? convos.find(
    function(convo){
      return convo.id === id;
    }
  ) : null;
  const messages = theConvo && theConvo.messages;
  return messages ? messages : null;
};

function getNonConvo(state: typeRootState) {
  const toUser = state.conversations.toUser;
  if(toUser) return toUser;
  return null;
};

const ConnConversationWindow = connect(mapStateToProps)(ConversationWindow);

export default ConnConversationWindow;