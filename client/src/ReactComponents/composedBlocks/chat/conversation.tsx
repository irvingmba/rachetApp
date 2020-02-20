import React, { useReducer } from "react";
import { genFormReducer, genActionForm, test1 } from "../utils/FormReducers";

interface lclStateType {
  messages?:{
    nickname: string;
    date: Date;
    msg: string
  }[];
};


function handleState(state: {}, handler:React.Dispatch<{type:string;payload:{}}>){
  return function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(state);
    console.log(createMsg("currentMsg" in state ? state["currentMsg"] : "",{nickname: "test", date: Date(), msg: ""}));
  };
};

function createMsg(msg: string, userData: {}){
  return {
    ...userData,
    msg: msg
  };
};

function pushMessage(msgs:[],msg:{}){
  return [...msgs, msg];
};

function typingMsg(state:{}, handler:React.Dispatch<{type:string;payload:{}}>){
  return function(event:React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    handler(genActionForm({currentMsg: value}));
  }
};

/* --------------- REACT COMPONENT ----------------------- */
export function ConversationWindow(){
  const [state, updState] = useReducer(genFormReducer,{} as test1);
  type lclStateType2 = typeof state;
  const msgList = printMsgs(state);
  const baseMsg = {
    nickname: "test",
    date: Date(),
    msg: ""
  };

  function printMsgs(state:lclStateType2){
    if("messages" in state){
      const stateArr = state["messages"] || [];
      const messages = stateArr.reduce(
        function(acc:JSX.Element[], message){
          const msgElement = <li>
            <h6>{message["nickname"]}:</h6>
            <p>{message["msg"]}</p>
            <sub>{ message["date"]}</sub>
          </li>;
          return acc.concat(msgElement);
        }, []
      );

      return messages;
    };
    return null;
  };

  return (
    <>
    <h5>Chat conversation</h5>
      <ul>
      {msgList ? msgList : "The conversation is empty"}
      </ul>
    <form onSubmit={handleState(state,updState)}>
      <input type="text" onChange={typingMsg(state,updState)}/>
      <input type="submit" value="Send"/>
    </form>
    </>
  );
};