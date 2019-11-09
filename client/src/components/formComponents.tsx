import React, { useState, useEffect, ReactHTML, InputHTMLAttributes } from 'react';
import { TinputProps, TSubmitProps, IsetObject, IinputProps } from '../types/formTypes';

const [value, setValue] = useState('');

export const FormInput = (props:IinputProps) => {
    const {data, setData} = (props.handlers as IsetObject) || {value, setValue} ;
    const inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const targetValue=event.target.value;
        if(!props.handlers) console.log(targetValue);
        // setData({...data, [props.properties.value as string]:event.target.value});
    };
    return 
        <input 
        {...props.properties}
        />
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