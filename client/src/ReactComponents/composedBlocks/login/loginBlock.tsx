import React, { useReducer } from 'react';
import { mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers';
import { connect, useDispatch } from "react-redux";
import { ASC_LOGIN } from "../../../StateManagement/reduxSaga/sagaLogin";

const LoginBlock:React.FunctionComponent<{}> = () => {
    
    const [state, update] = useReducer(simpleFormReducer, {});
    const inputElements = mapInputsToArray( inputsLogin, [state, update] );
    const dispatch = useDispatch();

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: ASC_LOGIN, payload:state})
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


const ConnectedLogin = connect(null)(LoginBlock);

export { ConnectedLogin as default};