import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getInputNames, arrayToObject, mapInputElements } from '../components/formFunctions';
import { IsetObject, IinputProps, IinputConfig, Iformprops } from '../types/formTypes';

/**
 * 
 * @param props has a property parameter that is required and this parameter is an object that requires type and name for the inputs, handlers is for hooks that are created externally and children is for elements that we want to pass it as parameters
 */
const GenInput = (props:IinputProps) => {
    const [value, setValue] = useState({[props.properties.name]:''});
    const {data, setData} = (props.handlers as IsetObject) || {data:value, setData:setValue};
    const modifiers = {};
    const inputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const targetValue=event.target.value;
        setData({
            ...data,
            [props.properties.name]:targetValue
        });
    };
    
    if(props.properties.type === "submit") Object.assign(modifiers,{onChange: null});

    return (
        <input 
        onChange={inputChange}
        value={data[props.properties.name]}
        {...props.properties}
        {...modifiers}
        />)
    ;
};

const GenForm:React.FunctionComponent<Iformprops> = (props:Iformprops) => {
    const names=getInputNames(props.inputElements);
    const nameObject = arrayToObject(names);
    const [data,setData] = useState({...nameObject});
    const inputs = mapInputElements(props.inputElements, [data,setData]);

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post(props.url,data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>
                {props.title}
            </h1>
        {inputs}
        </form>
    );
};

export { GenInput, GenForm };