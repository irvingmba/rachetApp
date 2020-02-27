import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, UPDATE_CONTACTS, SELECT_CONTACT, TActSelectContact, TActUpdateContactList, ISelectContact, Ostatus, TActLoginSuccess, TActPushMsg, PUSH_MSG, IActPushMsg, TActRegistry, REGISTRY, SEL_USER_MSG, ISelUserMsg, TActSelUserMsg } from './actionCreators';


/* ------------- REDUCERS ----------------- */

const initiaLogin = {
    status: Ostatus.offline,
    registry: false
};

// Login reducer
function redUserLogin(state: ILoginState = initiaLogin, action:TActionLogin) {
    console.log("LOGIN",state);
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...state, ...action.payload};
        case REGISTRY:
            return {...state, ...action.payload};
        default:
            return state;
    };
};

interface ILoginState {
    registry?: boolean;
    user?: string;
    status?: Ostatus;
    name?: string;
    email?: string;
    birthday?: Date;
};

type TActionLogin = TActLoginSuccess | TActRegistry;

// Contacts reducer
function redUserContacts(state:contactsState = {}, action:IActionContacts) {
    console.log("CONTACTS",state);
    switch(action.type) {
        case UPDATE_CONTACTS:
            return {...state, contactList:action.payload as []};
        case SELECT_CONTACT:
            return {
                ...state,
                currentContact: {...action.payload as ISelectContact}
            };
        default: 
            return state;
    };
};

interface contactsState {
    contactList?: [];
    currentContact?: ISelectContact;
};

type IActionContacts = TActSelectContact | TActUpdateContactList;

// Conversations reducer
function redConversations(state:IConversationState = {}, action: TActionConversations){
    console.log("Conversation",state);
    switch(action.type){
        case SEL_USER_MSG:
            const selPayload = action.payload as ISelUserMsg;
            return {
                ...state,
                toUser: {...selPayload}
            };
        case PUSH_MSG:
            return {
                ...state,
            };
        default:
            return state;
    };
};

interface IConversationState {
    conversationList?: IconversationList[];
    toUser?: ISelUserMsg;
};

interface IconversationList {
    messages: IActPushMsg[];
    participants: Iplayers[];
    update: Date;
    notSent: number;
    chatName: string;
};

interface Iplayers {
    username:string;
};

type TActionConversations = TActSelUserMsg | TActPushMsg;


// ROOT REDUCER

const combinedReducer = combineReducers({
    login: redUserLogin,
    contacts: redUserContacts,
    conversations: redConversations
});

export default combinedReducer;

// export type loginState = ReturnType<typeof redUserLogin>;
// export type contactState = ReturnType<typeof redUserContacts>;
// export type conversationState = ReturnType<typeof redConversations>;

export type typeRootState = ReturnType<typeof combinedReducer>;