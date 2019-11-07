import React,{Props} from 'react';
import { TinputProps } from '../types/formTypes';

export const FormInput:React.FunctionComponent<TinputProps> = (props:TinputProps) => {
    return (
        <label>
            Name:
            <input
                type={props.inputType}
                name={props.inputName}
            />
        </label>
    );
};