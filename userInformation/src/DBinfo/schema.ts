import mongoose, { ConnectionOptions } from 'mongoose';
import { IsmUserInfo, ImdUserInfo, IsmContacts, ImdContacts, IsmCont } from "./types";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/**
 * Connection to the user information database
 */
const uri = "mongodb://localhost/rachet";
const options:ConnectionOptions = {
    useNewUrlParser: true,
    dbName: "userInfo",
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useFindAndModify: false,
    useUnifiedTopology: true
};
const dbUI = mongoose.createConnection(uri,options);
dbUI.on('error',console.error.bind(console,'connection error'));
dbUI.once('open', function(){
    console.log("Connection to DB userInfo stablished");
});

/**
 * Schema definition
 */
const schemIDcont:mongoose.Schema<IsmCont> = new Schema({
    idc: {
        type: ObjectId,
        alias: "dataContact"
    }
}, {
    autoIndex: false
});

const schemContacts:mongoose.Schema<IsmContacts> = new Schema({
    ci: {
        type: [schemIDcont],
        alias: "contactIds",
        ref: ""
    },
}, {
    autoIndex: false
});

const schemUserInfo:mongoose.Schema<IsmUserInfo> = new Schema({
    n: {
        type: String,
        alias: "name"
    },
    nk: {
        type: String,
        alias: "nickname"
    },
    e: {
        type: String,
        alias: "email"
    },
    b: {
        type: String,
        alias: "birthday"
    },
    ip: {
        type: ObjectId,
        alias: "idAccess"
    },
    ic: {
        type: ObjectId,
        alias: "idContacts",
        ref: "contacts"
    },
    ida: {
        type: ObjectId,
        alias: "idActions"
    }
},{
    autoIndex: false
});

// const schemConversations:mongoose.Schema<> = new Schema({
//     m: [{
//         d: {
//             type: mongoose.Schema.Types.Date,
//             alias: "date"
//         },
//         mt: {
//             type: ObjectId,
//             alias: "idMeeter",
//             ref: ""
//         },
//         mg: {
//             type: String,
//             alias: "message"
//         },
//     }],
// });

/**
 * Middleware for schema validation
 */


/**
 * Model definitions
 */
export const mdUserInfo = dbUI.model<ImdUserInfo>("uInfo",schemUserInfo,"uInfo");
export const mdContacts = dbUI.model<ImdContacts>("contacts",schemContacts,"contacts");
// const mdConversations = dbUI.model<>("conversations", schemConversations);