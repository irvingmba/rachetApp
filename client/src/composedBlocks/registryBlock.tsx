import { FormInput, FormSubmit } from '../components/formComponents';
import React,{ useState } from 'react';
import axios from 'axios';

export const Registry:React.FunctionComponent = () => {
    const [data,setData] = useState({});
    const test = {data, setData};

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {Name, Nickname, Birthday, Email, Password}:{[prop:string]:string} = data;
        axios.post('/',{Name})
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registry</h1>
            <FormInput formData={test} inputLabel="Name:" inputName="Name" inputType="text" />
            <FormInput formData={{data,setData}} inputLabel="Nickname" inputName="Nickname" inputType="text" />
            <FormInput formData={{data,setData}} inputLabel="Birthday" inputName="Birthday" inputType="date" />
            <FormInput formData={{data,setData}} inputLabel="E-mail" inputName="Email" inputType="email" />
            <FormInput formData={{data,setData}} inputLabel="Password" inputName="Password" inputType="password" />
            <FormSubmit name="send" value="send" />
        </form>
    );
};