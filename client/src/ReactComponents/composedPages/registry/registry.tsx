import React from 'react';

import Registry from '../../composedBlocks/registry/registryBlock';
import { NavLink } from 'react-router-dom';

const RegistryPage = () => {

    return (
        <>
        <NavLink
        to="/"
        >Login</NavLink>
            <Registry />
        </>
    );
};

export default RegistryPage;