import React, { useState, SetStateAction, useContext, useEffect } from "react";
import { actionForm } from "../../composedBlocks/utils/FormReducers";
import CSS from "csstype";

interface Iprops {
  properties: Iproperties;
  parentState?: IparentState;
  label?: string;
  style?:CSS.Properties;
};

export interface Iproperties {
  name: string;
  type: string;
  [x:string]:string|number|boolean;
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

/**
 * Function that creates a form using React
 * @param properties The properties of the inputs
 * @param parentState An object containing the state of the form that will wrap the inputs(reducer form)
 * @param label The label of the input
 */
const FormInput:React.FunctionComponent<Iprops> = ({properties, parentState, label, style}) => {

  const inputProps = {...properties},
  css={...style || undefined},
  [value, setValue] = useState(""),
  {state, dispatch} = parentState || {};
  Object.assign(inputProps,handleChange(setValue, dispatch));
  
  return (
    <label>
      {label ? label : ""}
      <input
      value = {state && properties.name in state ? state[properties.name] : value}
      {...inputProps}
      style={css}
      />
    </label>
  );

};

export default FormInput;