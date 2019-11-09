import {  FunctionComponent } from 'react';
import { string } from 'prop-types';

export interface IinputProps {
    children?: FunctionComponent;
    properties?: {
        [propName: string]: string|boolean;
    };
    handlers?: IsetObject;
};

export interface TinputProps {
    children?: FunctionComponent;
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    required?: boolean;
    onClick?: TreactOnClick;
    onChange?: TreactOnChange;
    formData?: IsetObject;
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

export type TreactOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>void;
export type TreactOnClick = (event: React.MouseEvent<HTMLInputElement,MouseEvent>) => void;