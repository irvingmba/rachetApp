import React, { useState, SetStateAction, useContext, useEffect } from "react";
import { actionForm } from "../../composedBlocks/utils/FormReducers";

interface Iprops {
  properties: Iproperties;
  parentState?: IparentState;
  label?: string;
};

interface Iproperties {
  name: string;
  type: string;
  required?: boolean;
};

interface IparentState {
  state: {
    [key:string]: string;
  };
  dispatch: React.Dispatch<Idispatch>;
};

interface Idispatch{
  type: string;
  payload: {};
};

export const ALTER = 'ALTER';

const handleChange = (setValue:React.Dispatch<SetStateAction<string>> ,dispatch?:React.Dispatch<Idispatch>) => {
  if(!dispatch){
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }
    };
  };
  return {
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=> {
      const value = event.target.value;
      dispatch(actionForm(event.target.name, value));
    }
  };
};

const manageState = (local:string, parent?:string) => {
  if(parent){};
};

const FormInput:React.FunctionComponent<Iprops> = ({properties, parentState, label}) => {

  const inputProps = {...properties},
  [value, setValue] = useState(""),
  {state, dispatch} = parentState || {};
  Object.assign(inputProps,handleChange(setValue, dispatch));
  
  return (
    <label>
      {label ? label : ""}
      <input
      value = {state && properties.name in state ? state[properties.name] : value}
      {...inputProps}
      />
    </label>
  );

};

export default FormInput;