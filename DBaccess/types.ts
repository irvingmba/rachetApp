import mongoose, { Document } from "mongoose";

export interface IsmUserAccess {
    password: string;
};
export interface ImdUserAccess extends Document, IsmUserAccess {};
