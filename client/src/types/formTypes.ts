import {  FunctionComponent } from 'react';

export interface TinputProps {
    children?: FunctionComponent;
    inputLabel?: string;
    inputType?: string;
    inputName?: string;
    inputValue?: string;
    inputRequired?: string;
    inputOnClick?: TreactOnClick;
    inputOnChange?: TreactOnChange;
};

export type TreactOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>void;
export type TreactOnClick = (event: React.MouseEvent<HTMLInputElement,MouseEvent>) => void;