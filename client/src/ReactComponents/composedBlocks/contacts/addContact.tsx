import React, { useReducer } from "react";
import { mapInputsToArray } from "../utils/utilForm";
import { IinputConfig } from "../../../types/components";
import { simpleFormReducer } from "../utils/FormReducers";
import { useDispatch } from "react-redux";
import { asyncAddContact } from "../../../StateManagement/reduxSaga/asyncActions";

const addContactStruct:IinputConfig[] = [{
  properties: {
    name: "contact",
    type: "text"
  }
}, {
  properties: {
    name: "add",
    type: "submit",
    value: "Add"
  }
}];


function AddContact() {
  let [state,handler] = useReducer(simpleFormReducer,{});
  const inputs = mapInputsToArray(addContactStruct,[state,handler]);
  const dispatch = useDispatch();
  
  function handleState(state:{[x:string]:string}){
    return function handleSubmit(event:React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      console.log(state);
      dispatch(asyncAddContact(state));
      return ;
    };
  };
  
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