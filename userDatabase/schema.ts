import mongoose, { ConnectionOptions } from 'mongoose';
import { IMuserAccess, IMuserInfo, IMContacts } from './types';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const uri = "mongodb://localhost/rachet";
const options:ConnectionOptions = {
    useNewUrlParser: true,
    dbName: "rachet"
};
mongoose.connect(uri, options);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', function(){
    console.log("Connection to DB stablished");
});

const schemUserInfo = new Schema({
    user: {
        type: ObjectId,
        ref: "userAccess"
    },
    Name: String,
    Birthday: String,
}, {
    autoIndex:false,
});

const schemUserAccess = new Schema({
    Nickname: String,
    Email: String,
    Password: String
},{
    autoIndex: false
});

const schemContacts = new Schema({
    IDOwner: String,
    Contacts: [{id: String}],
    Conversations: [{id: String}]
},{
    autoIndex: false
});

export const userInfo = mongoose.model<IMuserInfo>("userInfo", schemUserInfo);
export const userAccess = mongoose.model<IMuserAccess>("userAccess",schemUserAccess);
export const contacts = mongoose.model<IMContacts>("contacts",schemContacts);

