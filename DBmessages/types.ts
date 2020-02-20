import mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;
/**
 * Types and interfaces for schemas and models
 */

 export interface ISmMessages {
    IDUser: ObjectId;
    message: string;
 };

 export interface ISmEvents {
     from: ObjectId;
     event: string;
     status: string;
 };

 export interface ISmConversations {
     messages: ISmMessages[];
 };

 export interface ISmNotifications {
     notifications: ISmEvents[];
 };

 export interface ISmUserActions {
     IDconversations: ISmConversations[];
     IDnotifications: ISmNotifications[];
 };

 export interface IMdUserActions extends mongoose.Document, ISmUserActions {};

 export interface IMdConversations extends mongoose.Document, ISmConversations {};

 export interface IMdNotifications extends mongoose.Document, ISmNotifications {};
 
/**
 * Types and interfaces for handling data
 */