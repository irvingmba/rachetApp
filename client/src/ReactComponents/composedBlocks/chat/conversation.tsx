import React, { useState } from "react";

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

/* Hnadling submit event from input */
function handleSubmit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();
  return;
};

function genMessage(data:{nickname: string, message: string}){
  return {
    nickname: data.nickname,
    date: Date(),
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
export function ConversationWindow({nickname}:props){

  const [state, updState] = useState("");
  const handleChange = updInput(updState);
  const msg = genMessage({nickname, message:state});
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

interface props{
  nickname: string;
};