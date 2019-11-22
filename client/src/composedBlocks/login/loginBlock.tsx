import React from 'react';
import { connect } from 'react-redux'

import { inputsLogin } from './elements';
import { GenForm } from '../../components/formComponents';

const Login:React.FunctionComponent = () => {
    return (
        <GenForm 
        title="Login"
        url=""
        inputElements={inputsLogin}
        />
    );
};

// const LoginP = connect()(Login);
export default Login;