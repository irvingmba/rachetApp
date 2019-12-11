import mongoose, { ConnectionOptions } from 'mongoose';
import { IMuserAccess, IMuserInfo, IMContacts } from './types';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const uri = "mongodb://localhost/rachet";
const options:ConnectionOptions = {
    useNewUrlParser: true,
    dbName: "access"
};
mongoose.connect(uri, options);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', function(){
    console.log("Connection to DB stablished");
});

const schemUserInfo = new Schema({
    Name: String,
    Birthday: String,
}, {
    autoIndex:false,
});

const schemUserAccess = new Schema({
    Nickname: String,
    Email: String,
    Password: String,
    userInfo: {
        type: ObjectId,
        ref: "userInfo"
    },
    contacts: {
        type: ObjectId,
        ref: "contacts"
    }
},{
    autoIndex: false
});

const schemContacts = new Schema({
    Contacts: [String],
    Conversations: [String]
},{
    autoIndex: false
});

export const userInfo = mongoose.model<IMuserInfo>("userInfo", schemUserInfo);
export const userAccess = mongoose.model<IMuserAccess>("userAccess",schemUserAccess);
export const contacts = mongoose.model<IMContacts>("contacts",schemContacts);

