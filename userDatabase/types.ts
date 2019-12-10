import mongoose, { Document } from "mongoose";


export interface IMuserAccess extends Document{
    Nickname: string;
    Email: string;
    Password: string;
};

export interface IMuserInfo extends Document {
    user: mongoose.Schema.Types.ObjectId;
    Name: string;
    Birthday: string;
};

export interface IMContacts extends Document {
    IDOwner: string;
    Contacts: {id: string}[];
    Conversations: {id: string}[];
};

export interface IcompRegistry {
    name: string;
    birthday: string;
    nickname: string;
    email: string;
    password: string;
};

export interface IpublicInfo {
    nickname: string;
    email: string;
};