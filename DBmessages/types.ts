import mongoose from 'mongoose';

type ObjectId = mongoose.Types.ObjectId;
/**
 * Types and interfaces for schemas and models
 */

 export interface ISmMessages {
    IDUser: ObjectId;
    message: string;
 };

 export interface ISmParticipants {
     IDUser: ObjectId;
 };

 export interface ISmEvents {
     from: ObjectId;
     username: string;
     event: string;
     status: string;
 };

 export interface ISmConversations {
     messages: ObjectId[];
     participants: ISmParticipants[];
     updated: number;
     kind: Ekind,
     chatName: string
 };

 export enum Ekind {
     simple = "simple",
     group = "group"
 };

 export interface ISmNotifications {
     notifications: ISmEvents[];
 };

 export interface ISmUserActions {
     IDconversations: ObjectId[];
     IDnotifications: ObjectId[];
 };

 export interface IMdUserActions extends mongoose.Document, ISmUserActions {};

 export interface IMdConversations extends mongoose.Document, ISmConversations {};

 export interface IMdNotifications extends mongoose.Document, ISmNotifications {};

 export interface IMdMessages extends mongoose.Document, ISmMessages {};
 
/**
 * Types and interfaces for handling data
 */