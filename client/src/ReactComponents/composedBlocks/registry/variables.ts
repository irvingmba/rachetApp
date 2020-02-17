import { IinputConfig } from '../../../types/components';
import { dateToHTMLString, nowToStdString } from '../utils/utilFns';

export const inputElements:IinputConfig[] = [
    {
        features: {
            label: "Name"
        },
        properties: {
            type: "text",
            name: "name",
            required: true,
            pattern: ".{3,100}",
            title: "You can type a name of 3 to 100 characters"
        },
    },
    {
        features: {
            label: "Nickname"
        },
        properties: {
            type: "text",
            name: "UserID",
            required: true,
            pattern: ".{3,30}",
            title: "You can type a nickname of 3 to 30 characters"
        },
    },
    {
        features: {
            label: "Birthday"
        },
        properties: {
            type: "date",
            name: "birthday",
            required: true,
            min: "1900-1-1",
            max: dateToHTMLString(),
            title: `An input starting from 01-01-1900 to ${nowToStdString()}`
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
