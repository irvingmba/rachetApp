import {  FunctionComponent } from 'react';

// Interfaces and types for input components
export interface IinputProps {
    children?: FunctionComponent|JSX.Element;
    properties: IinputProperties;
    handlers?: IsetObject;
};
export interface IinputProperties {
    name: string;
    type: string;
    required?: boolean|undefined;
};
export interface TSubmitProps {
    name?: string;
    value?: string;
};
export interface IsetObject {
    data: {
        [propName:string]: string;
    };
    setData: React.Dispatch<React.SetStateAction<{}>>;
};
export interface IinputConfig {
    properties: IinputProperties;
    features?:{
        label?: string;
    };
};

export type TreactOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>void;
export type TreactOnClick = (event: React.MouseEvent<HTMLInputElement,MouseEvent>) => void;