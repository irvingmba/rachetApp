import React from 'react';

import LoginBlock from '../composedBlocks/login/loginBlock';
import { NavLink } from 'react-router-dom';

const LoginPage:React.FunctionComponent = () => {

    return (
        <>
        <NavLink
        to="/registry"
        >Registry</NavLink>
            <LoginBlock />
        </>
    );
};

export default LoginPage;