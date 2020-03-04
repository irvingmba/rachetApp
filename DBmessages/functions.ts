import mongoose from "mongoose"
import { mdUserActions, mdConversations, mdNotifications, mdMessages } from "./schema";
import { ISmUserActions, ISmConversations, ISmNotifications, ISmMessages, ISmParticipants, ISmEvents } from "./types";

/*----------- LOCAL FUNCTIONS ------------- */

const genObjectId = mongoose.Types.ObjectId;

// CREATE

 function createNewUserAction(obj?:ISmUserActions){
    const action = new mdUserActions(obj);
    const doc = action.save();
    return doc;
};

 function createNewConversation(obj?: ISmConversations){
    const conversation = new mdConversations(obj);
    const doc = conversation.save();
    return doc;
};

function createNewMessage(obj: ISmMessages){
    const messages = new mdMessages(obj);
    const doc = messages.save();
    return doc;
};

 function createNewNotification(obj: ISmNotifications){
    const notification = new mdNotifications(obj);
    const doc =  notification.save();
    return doc;
};

// READ

function getUserAction(id: string) {
    return mdUserActions.findById(id);
};

export function getConversation(id: string) {
    return mdConversations.findById(id)
    .catch(function(reason){return null});
};

function getNotifications(id: string) {
    return mdNotifications.findById(id);
};

function getMessage(id: string) {
    return mdMessages.findById(id);
};

// UPDATE

// Simple chat functions

function pushMessage(idConversation: string, idMessage: string) {
    const modifier = {
        $push: {
            msgs: genObjectId(idMessage)
        }
    };
    return mdConversations.findByIdAndUpdate(idConversation, modifier);
};

function pushConversation(idUserAction: string, idConversation: string) {
    const modifier = {
        $push: {
            idc: genObjectId(idConversation)
        }
    };
    return mdUserActions.findByIdAndUpdate(idUserAction, modifier);
};

function pushNotification(idUserAction: string, idNotification: string) {
    const modifier = {
        $push: {
            idn: genObjectId(idNotification)
        }
    };
    return mdUserActions.findByIdAndUpdate(idUserAction, modifier);
};