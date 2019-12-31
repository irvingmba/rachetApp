import React, { useState, SetStateAction, useContext } from "react";
import { parentContext } from "../../composedBlocks/login/loginBlock";

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
      dispatch({
        type: ALTER,
        payload: {
          [event.target.name]: value,
        },
      });
      setValue(value);
    }
  };
};

const FormInput:React.FunctionComponent<Iprops> = ({properties, parentState, label}) => {

  const {state, dispatch} = useContext(parentContext);

  const inputProps = {...properties},
  // { state, dispatch } = parentState || {},
  [value, setValue] = useState("");
  Object.assign(inputProps,handleChange(setValue, dispatch));
  console.log(state);
  
  return (
    <label>
      {label ? label : ""}
      <input
      // value = {state && properties.name in state ? state[properties.name] : ""}
      value = {value}
      {...inputProps}
      />
    </label>
  );

};

export default FormInput;