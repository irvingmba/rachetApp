import React,{ useState, useReducer } from 'react';

import { inputElements } from './variables';
import { mapInputsToArray } from '../utils/utilForm';
import { simpleFormReducer } from "../utils/FormReducers";

const Registry:React.FunctionComponent = () => {
    const [state,dispatch] = useReducer(simpleFormReducer,{});
    const mappedInputs = mapInputsToArray(inputElements, {state, dispatch});
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(state);
    };

    return (
        <form
        onSubmit={handleSubmit}
        >
            <h1>Registry</h1>
            {...mappedInputs}
        </form>
    );
};

export default Registry;