import React from 'react';

import { Login } from '../composedBlocks/login/loginBlock';
import { Registry } from '../composedBlocks/registry/registryBlock';

const LoginPage = () => {

    return (
        <div>
            <Login />
            <Registry />
        </div>
    );
};

export { LoginPage };