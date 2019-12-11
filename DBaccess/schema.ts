import mongoose, { ConnectionOptions } from 'mongoose';
import { IMuserAccess, IMuserInfo, IMContacts } from './types';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

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


const schemUserAccess = new Schema({
    P: {
        type: String,
        alias: "password",
    },
},{
    autoIndex: false
});

export const userAccess = mongoose.model<IMuserAccess>("userAccess",schemUserAccess);

