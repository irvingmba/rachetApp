import { FormInput } from '../components/formComponents';
import React from 'react';

function inputEvent(event:React.ChangeEvent<HTMLInputElement>) {
    const test = event.target;
    console.log(test.value);
};



export const Registry:React.FunctionComponent = () => {
    return (
        <div>
            <h1>Registry</h1>
            <FormInput inputRequired="required" inputLabel="Name:" inputName="Name" inputType="text" inputOnChange={inputEvent} />
            <FormInput inputRequired="required" inputLabel="Nickname" inputName="Nickname" inputType="text" inputOnChange={inputEvent} />
            <FormInput inputRequired="required" inputLabel="Birthday" inputName="Birthday" inputType="date" inputOnChange={inputEvent} />
            <FormInput inputRequired="required" inputLabel="E-mail" inputName="E-mail" inputType="email" inputOnChange={inputEvent} />
            <FormInput inputRequired="required" inputLabel="Password" inputName="Password" inputType="password" inputOnChange={inputEvent} />
            <FormInput inputName="Send" inputType="submit" inputValue="Send" />
        </div>
    );
};