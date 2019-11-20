import React from 'react';

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

export { Login };