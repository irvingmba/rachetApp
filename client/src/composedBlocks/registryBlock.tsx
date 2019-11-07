import { FormInput } from '../components/formComponents';
import React from 'react';

export const Registry:React.FunctionComponent = () => {
    return (
        <div>
            <FormInput inputLabel="Name:" inputName="Name" inputType="text" />
            <FormInput inputLabel="Nickname" inputName="Nickname" inputType="text" />
            <FormInput inputLabel="E-mail" inputName="E-mail" inputType="email" />
            <FormInput inputLabel="Password" inputName="Password" inputType="password" />
        </div>
    );
};