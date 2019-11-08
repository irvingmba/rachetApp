import React, { useState, useEffect } from 'react';
import { TinputProps } from '../types/formTypes';

export const FormInput:React.FunctionComponent<TinputProps> = (props:TinputProps) => {
    const [inputVal, setInputVal] = useState('');
    
    return (
        <label>
            {props.inputLabel}
            <input
                type={props.inputType}
                name={props.inputName}
                value={inputVal}
                onChange={props.inputOnChange}
            />
        </label>
    );
};
