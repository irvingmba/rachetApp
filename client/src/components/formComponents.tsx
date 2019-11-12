import React, { useState, useEffect } from 'react';

import { TSubmitProps, IsetObject, IinputProps } from '../types/formTypes';

/**
 * 
 * @param props has a property parameter that is required and this parameter is an object that requires type and name for the inputs, handlers is for hooks that are created externally and children is for elements that we want to pass it as parameters
 */
export const FormInput = (props:IinputProps) => {
    const [value, setValue] = useState({[props.properties.name]:''});
    const {data, setData} = (props.handlers as IsetObject) || {data:value, setData:setValue} ;
    const inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const targetValue=event.target.value;
        setData({
            ...data,
            [props.properties.name]:targetValue
        });
    };
    return (
        <input 
        onChange={inputChange}
        value={data[props.properties.name]}
        {...props.properties}
        />)
    ;
};

export const FormSubmit:React.FunctionComponent<TSubmitProps> = (props:TSubmitProps) => {
    return (
        <input 
            type="submit"
            name={props.name}
            value={props.value}
        />
    );
};