import {  FunctionComponent } from 'react';

export interface TinputProps {
    children?: FunctionComponent;
    inputLabel?: string;
    inputType?: string;
    inputName?: string;
    inputValue?: string;
    inputRequired?: boolean;
    inputOnClick?: TreactOnClick;
    inputOnChange?: TreactOnChange;
};
export interface TSubmitProps {
    name?: string;
    value?: string;
};

export type TreactOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>void;
export type TreactOnClick = (event: React.MouseEvent<HTMLInputElement,MouseEvent>) => void;