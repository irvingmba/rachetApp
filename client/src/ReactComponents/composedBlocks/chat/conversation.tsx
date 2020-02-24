import React, { useState } from "react";
import { connect } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";

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

function genMessage(data:{username: string, message: string}){
  return {
    username: data.username,
    message: data.message
  };
};

function execSubmit(msg: TMessage){
  return function runningSubmit(event:React.FormEvent<HTMLFormElement>){
    handleSubmit(event);
    console.log(msg);
    return;
  };
};

type TMessage = ReturnType<typeof genMessage>;

/* --------------- REACT COMPONENT ----------------------- */
function ConversationWindow({user}:props){

  const [state, updState] = useState("");
  const handleChange = updInput(updState);
  const msg = genMessage({username: user, message:state});
  const submitMsg = execSubmit(msg);

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
  return state.login.user || "";
};

const ConnConversationWindow = connect(mapStateToProps)(ConversationWindow);

export default ConnConversationWindow;