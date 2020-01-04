import React, { useReducer, useState, useContext, createContext } from 'react';
// import axios from 'axios';

import { mutationLogin } from "../utils/queries"
import { mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers'
import { loginUser } from "../utils/httpRequest";


const LoginBlock:React.FunctionComponent<{}> = () => {
    
    const [state, dispatch] = useReducer(simpleFormReducer, {});
    const inputElements = mapInputsToArray( inputsLogin, [state, dispatch] );

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state);
        const {user, password} = state || {};
        loginUser(mutationLogin({user, password}));
    };
    
    return (
        <form
        onSubmit={handleSubmit}
        >
            <h1>Login</h1>
            {inputElements}
        </form>
    );
};

export { LoginBlock as default};