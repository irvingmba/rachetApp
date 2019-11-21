import { IinputConfig } from '../../types/components';

export const inputElements:IinputConfig[] = [
    {
        features: {
            label: "Name"
        },
        properties: {
            type: "text",
            name: "name",
            required: true
        },
    },
    {
        features: {
            label: "Nickname"
        },
        properties: {
            type: "text",
            name: "UserID",
            required: true
        },
    },
    {
        features: {
            label: "Birthday"
        },
        properties: {
            type: "date",
            name: "birthday",
            required: true
        },
    },
    {
        features: {
            label: "E-mail"
        },
        properties: {
            type: "email",
            name: "email",
            required: true
        },
    },
    {
        features: {
            label: "Password"
        },
        properties: {
            type: "password",
            name: "password",
            required: true
        },
    },
    {
        features: {
            label: "Confirm password"
        },
        properties: {
            type: "password",
            name: "confPassword",
            required: true
        },
    },
    {
        properties: {
            name: "send",
            type: "submit",
            value: "Register",
        },
    },
];
