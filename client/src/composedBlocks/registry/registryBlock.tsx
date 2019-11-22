import React,{ useState } from 'react';

import { inputElements } from './variables';
import { GenForm } from '../../components/formComponents';


const Registry:React.FunctionComponent = () => {
    return (
        <GenForm 
        title="Registry"
        url="http://localhost:8080/"
        inputElements={inputElements}
        />
    );
};



export default Registry;