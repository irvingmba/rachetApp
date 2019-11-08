import React, { useState, useEffect } from 'react';
import { TinputProps, TSubmitProps } from '../types/formTypes';

export const FormInput:React.FunctionComponent<TinputProps> = (props:TinputProps) => {
    const [value, setValue] = useState(props.inputValue||'');
    const inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <label>
            {props.inputLabel}
            <input
                type={props.inputType}
                name={props.inputName}
                value={value}
                onChange={inputChange}
                required
            />
        </label>
    );
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