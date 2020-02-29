import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";
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

function genMessage<T>(data:{user:T, message: string}){
  return {
    user: data.user,
    message: data.message
  };
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

function printMessages(arrMessage: IMsgFromServer[]) {
  const arrElements = arrMessage.reduce(
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
};

/* --------------- REACT COMPONENT ----------------------- */
function ConversationWindow({user}:props){

  const [state, updState] = useState("");
  const dispatch=useDispatch();
  const handleChange = updInput(updState);
  const msg = genMessage({user, message:state});
  const submitMsg = execSubmit(msg, dispatch);

  return (
    <>
    <h5>Chat conversation</h5>
      <ul>
      {"The conversation is empty"}
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
  };
};

type props = ReturnType<typeof mapStateToProps>;

function getOwnUser(state: typeRootState) {
  return {
    username: state.login.user,
    email: state.login.email
  };
};

const ConnConversationWindow = connect(mapStateToProps)(ConversationWindow);

export default ConnConversationWindow;