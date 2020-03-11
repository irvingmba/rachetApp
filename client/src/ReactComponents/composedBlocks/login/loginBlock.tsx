import React, { useReducer } from 'react';
import { mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers';
import { connect, useDispatch } from "react-redux";
import { typeRootState } from '../../../StateManagement/redux/reducers';
import { actionRegistry } from '../../../StateManagement/redux/actionCreators';
import { loginBlockStyles } from './styles';

const ASC_LOGIN = "ASC_LOGIN";

const LoginBlock:React.FunctionComponent<props> = ({registry}) => {
    
    const [state, update] = useReducer(simpleFormReducer, {});
    const inputElements = mapInputsToArray( inputsLogin, [state, update] );
    const dispatch = useDispatch();
    if(registry) dispatch(actionRegistry({registry: false}));
    const style = loginBlockStyles();

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: ASC_LOGIN, payload:state})
    };
    
    return (
        <form
        onSubmit={handleSubmit}
        className={style.form}
        >
            {inputElements}
        </form>
    );
};


/* -------- REDUX FUNCTIONS ------- */

function getRegistry(state: typeRootState) {
    if(state.login.registry === true) return true;
    return false;
  };

function mapStateToProps(state: typeRootState) {
    return {
        registry: getRegistry(state)
    };
};

type props = ReturnType<typeof mapStateToProps>;

const ConnectedLogin = connect(mapStateToProps)(LoginBlock);

export { ConnectedLogin as default};