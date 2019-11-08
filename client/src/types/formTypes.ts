import {  FunctionComponent } from 'react';
import { string } from 'prop-types';

export interface TinputProps {
    children?: FunctionComponent;
    inputLabel?: string;
    inputType?: string;
    inputName?: string;
    inputValue?: string;
    inputRequired?: boolean;
    inputOnClick?: TreactOnClick;
    inputOnChange?: TreactOnChange;
    formData?: IsetObject;
};
export interface TSubmitProps {
    name?: string;
    value?: string;
};
export interface IsetObject {
    data: Object;
    setData: React.Dispatch<React.SetStateAction<{}>>;
};

export type TreactOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>void;
export type TreactOnClick = (event: React.MouseEvent<HTMLInputElement,MouseEvent>) => void;