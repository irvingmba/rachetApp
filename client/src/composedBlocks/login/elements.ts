import { IinputConfig } from '../../types/formTypes';

const inputsLogin:IinputConfig[] = [
    {
        features: {
            label: "User",
        },
        properties: {
            name: "user",
            type: "text",
            required: true,
        },
    },
    {
        features: {
            label: "Password",
        },
        properties: {
            name: "password",
            type: "password",
            required: true,
        },
    },
    {
        properties: {
            name: "signin",
            type: "submit",
            value: "Sign in"
        },
    },
];

export { inputsLogin };