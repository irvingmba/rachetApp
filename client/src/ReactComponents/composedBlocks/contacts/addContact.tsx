import React, { useReducer } from "react";
import { mapInputsToArray } from "../utils/utilForm";
import { IinputConfig } from "../../../types/components";
import { simpleFormReducer } from "../utils/FormReducers";
import e from "express";

const addContactStruct:IinputConfig[] = [{
  properties: {
    name: "Contact",
    type: "text"
  }
}, {
  properties: {
    name: "Add",
    type: "submit",
    value: "Add"
  }
}];

function handleState(state:{[x:string]:string}){
  return function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    console.log(state);
  };
};

function AddContact() {
  let [state,handler] = useReducer(simpleFormReducer,{});
  const inputs = mapInputsToArray(addContactStruct,[state,handler]);


  return (
    <>
    <h3>Add Contact</h3>
    <form onSubmit={handleState(state)}>
      {...inputs}
    </form>
    </>
  );
}

export default AddContact;