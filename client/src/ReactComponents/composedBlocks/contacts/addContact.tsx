import React, { useReducer } from "react";
import { mapInputsToArray } from "../utils/utilForm";
import { IinputConfig } from "../../../types/components";
import { simpleFormReducer } from "../utils/FormReducers";

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

function AddContact() {
  let [state,handler] = useReducer(simpleFormReducer,{});
  const inputs = mapInputsToArray(addContactStruct,[state,handler]);
  return (
    <>
    <h3>Add Contact</h3>
    {...inputs}
    </>
  );
}

export default AddContact;