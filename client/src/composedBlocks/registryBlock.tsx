import { FormInput, FormSubmit } from '../components/formComponents';
import React,{ useState } from 'react';

function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
};

export const Registry:React.FunctionComponent = () => {
    return (
        <form onSubmit={handleSubmit}>
            <h1>Registry</h1>
            <FormInput inputLabel="Name:" inputName="Name" inputType="text" />
            <FormInput inputLabel="Nickname" inputName="Nickname" inputType="text" />
            <FormInput inputLabel="Birthday" inputName="Birthday" inputType="date" />
            <FormInput inputLabel="E-mail" inputName="E-mail" inputType="email" />
            <FormInput inputLabel="Password" inputName="Password" inputType="password" />
            <FormSubmit name="send" value="send" />
        </form>
    );
};