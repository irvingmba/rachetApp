import React from 'react';

import LoginP from '../composedBlocks/login/loginBlock';
import { UserConnected } from '../composedBlocks/notifications/contacts';



const LoginPage:React.FunctionComponent = () => {

    return (
        <>
            <LoginP />
            <UserConnected />
        </>
    );
};

export default LoginPage;