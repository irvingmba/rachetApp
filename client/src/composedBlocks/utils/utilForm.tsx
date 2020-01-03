import React from 'react';
import FormInput from "../../components/form/formInput";
import { IinputConfig } from '../../types/components';

/**
 * @description Function that maps an array of objects with features and input properties
 * @param inputs Array of objects with features of input elements
 * @returns An array of <FormInput> components
 */
export function mapInputsToArray( inputs:IinputConfig[], [state, dispatch]:[{[key:string]:string;},React.Dispatch<{type: string; payload: {}}>] ) {
  
  const handlers = {state, dispatch}
  const inpComponents = inputs.map( input => {
    const iLabel = input.features && input.features.label ? input.features.label : undefined;
    return (
        <FormInput 
        key={input.properties.name}
        label={iLabel}
        parentState={handlers}
        properties={input.properties}
        />
    );
  });
  return inpComponents;
};

function handleDispatch(dispatch:React.Dispatch<{type: string; payload: {}}>) {
  
  return 
};
/**
 * @description Function that takes an array with objects that contains input properties and gives back an array with the names of those elements
 * @param inputs Array of objects that contains the properties of input elements
 * @returns An array of the input names
 */
export function getInputNames(inputs:IinputConfig[]){
  const names:string[] = inputs.reduce<string[]>((acc:string[], input:IinputConfig)=>{
      if (input.properties.type !== "submit") {
          return [...acc, input.properties.name];
      };
      return acc;
  },[]);
  return names;
};

/**
 * @description Function that takes an string array and returns an object with the elements of the array as keys
 * @param array Array of strings
 * @returns An object with the elements of the array as keys with a default value of ""
 */
export function arrayToObject(array:string[]) {
  const toObject={};
  array.map((element)=>{
      Object.assign(toObject,{[element]:""})
  });
  return toObject;
};