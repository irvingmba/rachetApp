import mongoose, { Document } from "mongoose";

type ObjectId = mongoose.Types.ObjectId;

export interface IsmUserAccess {
    password: string;
    nickname: string;
    email: string;
    lastLogin: string;
};
export interface ImdUserAccess extends Document, IsmUserAccess {};
