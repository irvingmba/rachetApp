import React, { useState, useEffect } from 'react';
import { TinputProps, TSubmitProps, IsetObject } from '../types/formTypes';

export const FormInput:React.FunctionComponent<TinputProps> = (props:TinputProps) => {
    const {data, setData} = props.formData as IsetObject;
    const inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [props.inputName as string]:event.target.value});
    };
    return (
        <label>
            {props.inputLabel}
            <input
                type={props.inputType}
                name={props.inputName}
                value={data.inputName}
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