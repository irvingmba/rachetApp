import { FormInput } from '../components/formComponents';
import React from 'react';

export const Registry:React.FunctionComponent = () => {
    return (
        <div>
            <h1>Registry</h1>
            <FormInput inputRequired="required" inputLabel="Name:" inputName="Name" inputType="text" />
            <FormInput inputRequired="required" inputLabel="Nickname" inputName="Nickname" inputType="text" />
            <FormInput inputRequired="required" inputLabel="Birthday" inputName="Birthday" inputType="date" />
            <FormInput inputRequired="required" inputLabel="E-mail" inputName="E-mail" inputType="email" />
            <FormInput inputRequired="required" inputLabel="Password" inputName="Password" inputType="password" />
            <FormInput inputName="Send" inputType="submit" inputValue="Send" />
        </div>
    );
};