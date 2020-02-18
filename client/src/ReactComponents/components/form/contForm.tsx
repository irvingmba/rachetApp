import React, { useReducer } from 'react';

interface Iprops {
  properties?:{
    [key:string]: string;
  };
};

const ContForm:React.FunctionComponent<Iprops> = ({properties}) => {

  return (
    <form
    {...properties}
    >
    </form>
  );
};