import React, { useState } from "react";

interface Iprops {
  properties?: Iproperties;
  handlers?: string
};

interface Iproperties {
  name: string;
  type: string;
  required?: boolean;
};

const inputState = () => {
  const [state, setState] = useState<string>('');
};

const FormInput:React.FunctionComponent<Iprops> = ({properties, handlers}) => {

  return (
    <input
    {...properties}
    />
  );
};