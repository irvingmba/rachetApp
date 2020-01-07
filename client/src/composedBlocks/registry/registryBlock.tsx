import React,{ useReducer } from 'react';
import { inputElements } from './variables';
import { mapInputsToArray } from '../utils/utilForm';
import { simpleFormReducer } from "../utils/FormReducers";
import { connect, useDispatch } from 'react-redux';
import { ASC_REGISTER } from "../../reduxSaga/sagaRegister";
import { verifySamePassword, alertDifferentPass } from '../utils/utilFns';

const Registry:React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const [state,update] = useReducer(simpleFormReducer,{});
    const mappedInputs = mapInputsToArray(inputElements,[state, update]);

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const samePass = verifySamePassword(state);
        if(samePass) {
            dispatch({type:ASC_REGISTER, payload: state});
        } else{
            alertDifferentPass();
        };
    };

    return (
        <form
        onSubmit={handleSubmit}
        >
            <h1>Registry</h1>
            {mappedInputs}
        </form>
    );
};

const connectedRegistry = connect(null)(Registry);

export default connectedRegistry;