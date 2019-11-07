import React from 'react';
import { TinputProps } from '../types/formTypes';

export const FormInput:React.FunctionComponent<TinputProps> = (props:TinputProps) => {
    return (
        <label>
            {props.inputLabel}
            <input
                type={props.inputType}
                name={props.inputName}
                value={props.inputValue}
                onClick={props.inputOnClick}
                onChange={props.inputOnChange}
            />
        </label>
    );
};
