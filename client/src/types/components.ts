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
    [x:string]:string|number|boolean;
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
export interface Iformprops {
    title: string;
    url: string;
    inputElements: IinputConfig[];
    callback?: (data:any)=>void;
};

export type TreactOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>void;
export type TreactOnClick = (event: React.MouseEvent<HTMLInputElement,MouseEvent>) => void;