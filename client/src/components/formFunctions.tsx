import React from 'react';
import { GenInput } from '../components/formComponents';
import { IinputConfig } from '../types/components';

function mapInputElements(config:IinputConfig[], [state,setState]:[{},React.Dispatch<React.SetStateAction<{}>>]) {
    const elements = config.map((element,index) => {
        const properties={...element.properties};
        if(element.features && element.features.label){
            return (
                <label key={element.features.label+index} >{element.features.label}
                <GenInput
                key={element.properties.name+index}
                handlers={{data:state, setData:setState}}
                properties={properties}
                />
                </label>
            );
        };
        return (
            <GenInput
            key={element.properties.name+index}
            properties={properties}
            />
        );
    });
    return elements;
};

function getInputNames(inputs:IinputConfig[]){
    const names:string[] = inputs.reduce<string[]>((acc:string[], input:IinputConfig)=>{
        if (input.properties.type !== "submit") {
            return [...acc, input.properties.name];
        };
        return acc;
    },[]);
    return names;
};

function arrayToObject(array:string[]) {
    const toObject={};
    array.map((element)=>{
        Object.assign(toObject,{[element]:""})
    });
    return toObject;
};

export {
    mapInputElements,
    getInputNames,
    arrayToObject
};