import React, { useState, useEffect, ReactHTML, InputHTMLAttributes } from 'react';
import { TinputProps, TSubmitProps, IsetObject, IinputProps } from '../types/formTypes';


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