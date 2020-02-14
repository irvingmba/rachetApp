import React, { useReducer } from 'react';
import { mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers';
import { connect, useDispatch } from "react-redux";
import { ASC_LOGIN } from "../../reduxSaga/sagaLogin";
import { Redirect } from 'react-router-dom';
import { PATH_DASHBOARD_VIEW } from '../../globalConfig';
import { stateType } from '../../redux/reducers';

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
            {/* {connected ? <Redirect to={PATH_DASHBOARD_VIEW} /> : ""} */}
        </form>
    );
};

// const userStatus = (state:stateType) => {
//     return "login" in state && "connected" in state["login"] ? state["login"]["connected"] : false;
// };

// const mapStateToProps = (state:stateType) => {
//     return {
//         connected: userStatus(state)
//     };
// };

const ConnectedLogin = connect(null)(LoginBlock);

export { ConnectedLogin as default};