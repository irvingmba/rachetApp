import validator from 'validator';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Interface for complete records
export interface IntPublicInfo {
    email: string;
    nickname: string;
};

export interface IpublicFace extends mongoose.Document {
    nickname: string;
    email: string;
    password: string;
};

export interface QUsers {
    id: string;
    name: string;
    nickname: string;
    birthday: string;
    email: string;
};

export interface MUser {
    name: string;
    nickname: string;
    birthday: string;
    email: string;
    password: string;
};

export interface MLogin {
    user: string;
    password: string;
};

export interface optVInputString {
    inputLanguage?: validator.AlphaLocale;
    stringLength?: validator.IsLengthOptions;
};

export interface stringError {
    code: number;
    reason: string;
};

export interface typeApproval {
    user: boolean;
    password: boolean;
};

export interface IntContext {
    request: Request;
    response: Response;
};