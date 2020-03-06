import validator from "validator";
import { Request, Response } from "express";

export interface IntUserInfo {
    id: string;
    name: string;
    birthday: string;
};
export interface IntUserAccess {
    id: string;
    nickname: string;
    email: string;
    password: string;
};
export interface IntContactInfo {
    id: string;
    contacts: string[];
    conversations: string[];
};

// Interfaces for resolver types

export interface IntUser {
    id: string;
    name: string;
    nickname: string;
    birthday: string;
    email: string;
};

export interface IntPublicFace {
    token?: string;
    id?: string;
    name?:string;
    nickname?: string;
    birthday?: string;
    email?: string;
};

export interface InUserActions {
    idConversations: string | null;
    idEvents: string | null;
};


export interface InArgsAddAction {
    id: string;
    idAction: string;
};

export interface IntConstText {
    alpha?: validator.AlphaLocale;
    length?: validator.IsLengthOptions;
};

export interface IntContext {
    request: Request;
    response: Response;
};

export interface optVInputString {
    inputLanguage?: validator.AlphaLocale;
    stringLength?: validator.IsLengthOptions;
};