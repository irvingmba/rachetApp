import { FormInput, FormSubmit } from '../components/formComponents';
import React,{ useState } from 'react';
import axios from 'axios';

import { inputElements } from '../pagesConf/registry/variables';
import { IinputProps, IinputConfig } from '../types/formTypes';
import { string } from 'prop-types';

export const Registry:React.FunctionComponent = () => {
    const names=getInputNames(inputElements);
    const nameObject = arrayToObject(names);
    const [data,setData] = useState({...nameObject});
    const inputs = mapInputElement(inputElements, [data,setData]);

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post('/portal',data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registry</h1>
            {inputs}
            <FormSubmit name="send" value="send" />
        </form>
    );
};

function mapInputElement(config:IinputConfig[], [state,setState]:[{},React.Dispatch<React.SetStateAction<{}>>]) {
    const elements = config.map((element,index) => {
        const properties={...element.properties};
        if(element.features && element.features.label){
            return (
                <label key={element.features.label+index} >{element.features.label}
                <FormInput
                key={element.properties.name+index}
                handlers={{data:state, setData:setState}}
                properties={properties}
                />
                </label>
            );
        };
        return (
            <FormInput
            key={element.properties.name+index}
            properties={properties}
            />
        );
    });
    return elements;
};

function getInputNames(inputs:IinputConfig[]){
    const names = inputs.map((input)=>input.properties.name);
    return names;
};

function arrayToObject(array:string[]) {
    const toObject={};
    array.map((element)=>{
        Object.assign(toObject,{[element]:""})
    });
    return toObject;
};