import mongoose, { ConnectionOptions } from 'mongoose';
import { ISmMessages, ISmEvents, ISmConversations, ISmNotifications, ISmUserActions, IMdUserActions, IMdConversations, IMdNotifications } from './types';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/**
 * Connection to the user information database
 */
const uri = "mongodb://localhost/rachet";
const dbName = "messages";

const options:ConnectionOptions = {
    useNewUrlParser: true,
    dbName,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useFindAndModify: false,
    useUnifiedTopology: true
};
const dbMessages = mongoose.createConnection(uri,options);
dbMessages.on('error',console.error.bind(console,'connection error'));
dbMessages.once('open', function(){
    console.log("Connection to DB Messages stablished");
});

/**
 * Schema definition
 */
const schemMessages:mongoose.Schema<ISmMessages> = new Schema({
    idm:{
        type: ObjectId,
        alias: "IDUser"
    },
    mg: {
        type: String,
        alias: "message"
    }
}, {
    autoIndex: false
});

const schemConversations:mongoose.Schema<ISmConversations> = new Schema({
    msgs: {
        type: [schemMessages],
        alias: "messages"
    }
}, {
    autoIndex: false
});

const schemEvents:mongoose.Schema<ISmEvents> = new Schema({
    f: {
        type: ObjectId,
        alias: "from"
    },
    e: {
        type: String,
        alias: "event"
    },
    s : {
        type: String,
        alias: "status"
    }
}, {
    autoIndex: false
});

const schemNotifications:mongoose.Schema<ISmNotifications> = new Schema({
    n: {
        type: [schemEvents],
        alias: "notifications"
    }
}, {
    autoIndex: false
});

const schemUserActions:mongoose.Schema<ISmUserActions> = new Schema({
    idc:{
        type: [schemConversations],
        alias: "IDconversations"
    },
    idn: {
        type: [schemNotifications],
        alias: "IDnotifications"
    }
}, {
    autoIndex: false
});


/**
 * Middleware for schema validation
 */


/**
 * Model definitions
 */
export const mdUserActions = dbMessages.model<IMdUserActions>("userActions", schemUserActions, "userActions");
export const mdConversations = dbMessages.model<IMdConversations>("Messages", schemConversations, "Messages");
export const mdNotifications = dbMessages.model<IMdNotifications>("Notifications", schemNotifications, "Notifications");