import mongoose, { ConnectionOptions } from 'mongoose';
import { MUser, IntPublicInfo } from '../userAccess/src/types';
import { Db } from 'mongodb';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

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
    IDAccess: ObjectId,
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

const userInfo = mongoose.model("userInfo", schemUserInfo);
const userAccess = mongoose.model("userAccess",schemUserAccess);
const contacts = mongoose.model("contacts",schemContacts);

export async function saveRegistry(record:MUser){
    const access = new userAccess({
        Nickname: record.nickname,
        Email: record.email,
        Password: record.password
    });
    const user = new userInfo({
        IDOwner: access._id,
        Name: record.name,
        Birthday: record.birthday
    });
    const pAccess = await access.save();
    const pUser = await user.save();
    return pAccess.id.toString();
};

export async function noDuplicate(user:IntPublicInfo) {
    const foundNick = await userAccess.find({Nickname: user.nickname});
    const foundEmail = await userAccess.find({Email: user.email});
    if(foundNick.length || foundEmail.length) {
        return true;
    };
    return false;
};

export async function userPassword(nickname:string){
    const found = await userAccess.find({Nickname: nickname});
    return found;
};