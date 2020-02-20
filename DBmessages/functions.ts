import { mdUserActions, mdConversations, mdNotifications } from "./schema";

function createNewUserAction(){
    const action = new mdUserActions();
    return action;
};

function createNewConversation(){
    const conversation = new mdConversations();
    return conversation;
};

function createNewNotification(){
    const notification = new mdNotifications();
    return notification;
};