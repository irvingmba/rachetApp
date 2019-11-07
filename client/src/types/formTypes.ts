import {  FunctionComponent } from 'react';

export interface TinputProps {
    children?: FunctionComponent;
    inputLabel?: string;
    inputType?: string;
    inputName?: string;
    inputValue?: string;
    inputRequired?: string;
    inputOnClick?: TreactEvent;
    inputOnChange?: TreactEvent;
};

type TreactEvent = (event: React.SyntheticEvent) =>void;