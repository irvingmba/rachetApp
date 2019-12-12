import mongoose from 'mongoose';

/**
 * Types and interfaces for schemas and models
 */
export interface IsmUserInfo {
    name: string;
    nickname: string;
    email: string;
    birthday: string;
    idPassword: mongoose.Types.ObjectId;
    idContacts: mongoose.Types.ObjectId[];
};
export interface ImdUserInfo extends mongoose.Document, IsmUserInfo {};

export interface IsmContacts {
    contactIds: string[];
    conversationIds: string[];
};
export interface ImdContacts extends mongoose.Document, IsmContacts {};

/**
 * Types and interfaces for handling data
 */
export interface Iregistry {
    name: string;
    nickname: string;
    email: string;
    birthday: string;
    password: string;
};