import { FormInput, FormSubmit } from '../components/formComponents';
import React,{ useState } from 'react';
import axios from 'axios';

import { inputElements } from '../pagesConf/registry/variables';
import { TinputConfig } from '../types/formTypes';

export const Registry:React.FunctionComponent = () => {
    const properties = {
        name: "Name",
        type: "text",
        required: true,
    };
    const [data,setData] = useState({
        [properties.name]:''
    });

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
            {/* <FormInput formData={test} inputLabel="Name:" inputName="Name" inputType="text" />
            <FormInput formData={{data,setData}} inputLabel="Nickname" inputName="Nickname" inputType="text" />
            <FormInput formData={{data,setData}} inputLabel="Birthday" inputName="Birthday" inputType="date" />
            <FormInput formData={{data,setData}} inputLabel="E-mail" inputName="Email" inputType="email" />
            <FormInput formData={{data,setData}} inputLabel="Password" inputName="Password" inputType="password" /> */}
            <FormSubmit name="send" value="send" />
        </form>
    );
};

function mapInputElement(config:TinputConfig) {
    const elements = config.map((element) => {
        if(element.label) {
            return (
                <label>
                    {element.label}
                    <FormInput
                        properties={():=>{
                            const copy = {...element};
                            delete copy.label;
                            return copy;
                        }}
                    />
                </label>
            );
        };
        return 
    });
};