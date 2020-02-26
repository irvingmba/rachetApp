import mongoose, { ConnectionOptions } from 'mongoose';
import { IsmUserAccess, ImdUserAccess } from './types';

const Schema = mongoose.Schema;

/**
 * Connection to the database
 */
const uri = "mongodb://localhost/rachet";
const options:ConnectionOptions = {
    useNewUrlParser: true,
    dbName: "access",
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useUnifiedTopology: true
};
const dbAS = mongoose.createConnection(uri,options);
dbAS.on('error',console.error.bind(console,'connection error'));
dbAS.once('open', function(){
    console.log("Connection to DB Access stablished");
});

/**
 * Schemma definition
 */
const schemUserAccess:mongoose.Schema<IsmUserAccess> = new Schema({
    P: {
        type: String,
        alias: "password",
    },
    n: {
        type: String,
        alias: "nickname"
    },
    e: {
        type: String,
        alias: "email"
    },
    l: {
        type: String,
        alias: "lastLogin"
    }
},{
    autoIndex: false
});

export const mdUserAccess = dbAS.model<ImdUserAccess>("userAccess",schemUserAccess,"userAccess");

