import React, { useState } from "react";

interface Iprops {
  properties?: Iproperties;
  parentState?: IparentState;
  label?: string;
};

interface Iproperties {
  name: string;
  type: string;
  required?: boolean;
};

interface IparentState {
  state: {};
  dispatch: React.Dispatch<Idispatch>;
};

interface Idispatch{
  type: string;
  payload: {};
};

const inputState = (init:string) => {
  const [state, setState] = useState<string>(init);
  return {
    state,
    setState
  };
};

const FormInput:React.FunctionComponent<Iprops> = ({properties, parentState, label}) => {

  const { state, dispatch } = parentState || { state: "", dispatch: undefined };
  const data = typeof state === 'string' ? state : state[properties ? properties.name]
  return (
    <label>
      {label ? label : ""}
      <input
      value = {data}
      onChange = {dispatch}
      {...properties}
      />
    </label>
  );

};

export default FormInput;