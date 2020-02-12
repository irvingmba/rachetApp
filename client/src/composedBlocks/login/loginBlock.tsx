import React, { useReducer } from 'react';
import { mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers';
import { connect, useDispatch } from "react-redux";
import { ASC_LOGIN } from "../../reduxSaga/sagaLogin";
import { Redirect } from 'react-router-dom';
import { PATH_DASHBOARD_VIEW } from '../../globalConfig';

const LoginBlock:React.FunctionComponent<{connected:boolean}> = ({connected}) => {
    
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
            {connected ? <Redirect to={PATH_DASHBOARD_VIEW} /> : ""}
        </form>
    );
};

const userStatus = ({Login}:{Login:{}}) => {
    console.log("connected" in Login ? Login["connected"]: "");
    return "connected" in Login ? Login["connected"] : false;
};

const mapStateToProps = (state:{Login:{}}) => {
    return {
        connected: userStatus(state)
    };
};

const ConnectedLogin = connect(mapStateToProps)(LoginBlock);

export { ConnectedLogin as default};