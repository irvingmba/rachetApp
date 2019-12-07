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

export interface IntUser {
    id: string;
    name: string;
    nickname: string;
    birthday: string;
    email: string;
};

export interface IntPublicFace {
    id: string;
    nickname: string;
    email: string;
};

export interface IntConstText {
    alpha?: validator.AlphaLocale;
    length?: validator.IsLengthOptions;
};

export interface IntContext {
    request: Request;
    response: Response;
    userInfo: IntUserInfo[];
    userAccess: IntUserAccess[];
    contactInfo: IntContactInfo[];
};