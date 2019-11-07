import { FormInput } from '../components/formComponents';
import React from 'react';

export const Registry:React.FunctionComponent = () => {
    return (
        <div>
            {FormInput({inputType: "text", inputName: "Name"})}
        </div>
    );
};