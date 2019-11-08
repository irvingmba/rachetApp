import React, { useState, useEffect } from 'react';
import { TinputProps } from '../types/formTypes';

const useInpValue = (originalValue:string) => {
    const [value, setValue] = useState(originalValue);
    return {
        value,
        setValue,
        inpChange: (event:React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
    };
};

export const FormInput:React.FunctionComponent<TinputProps> = (props:TinputProps) => {
    const {value, setValue, inpChange} = useInpValue(props.inputValue);
    return (
        <label>
            {props.inputLabel}
            <input
                type={props.inputType}
                name={props.inputName}
                value={value}
                onChange={inpChange}
            />
        </label>
    );
};
