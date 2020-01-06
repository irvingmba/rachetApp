import React, { useReducer } from 'react';
import { mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers';
import { mutationLogin } from "../../reduxSaga/http/queries";
import { loginUser } from "../../reduxSaga/http/httpRequest";
import { connect, useDispatch } from "react-redux";
import { USER_LOGIN } from '../../redux/actionCreators';

const LoginBlock:React.FunctionComponent<{}> = () => {
    
    const [state, update] = useReducer(simpleFormReducer, {});
    const inputElements = mapInputsToArray( inputsLogin, [state, update] );
    const dispatch = useDispatch();

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: USER_LOGIN, payload:state})
        // console.log(state);
        // const {user, password} = state || {};
        // loginUser(mutationLogin({user, password}));

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