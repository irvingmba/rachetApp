import mongoose, { Document } from "mongoose";


export interface IMuserAccess extends Document{
    Nickname: string;
    Email: string;
    Password: string;
    userInfo: mongoose.Types.ObjectId;
    contacts: mongoose.Types.ObjectId;
};

export interface IMuserInfo extends Document {
    Name: string;
    Birthday: string;
};

export interface IMContacts extends Document {
    IDOwner: string;
    Contacts: string[];
    Conversations: string[];
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