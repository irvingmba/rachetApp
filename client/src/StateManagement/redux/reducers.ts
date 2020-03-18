import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, UPDATE_CONTACTS, SELECT_CONTACT, TActSelectContact, TActUpdateContactList, ISelectContact, Ostatus, TActLoginSuccess, TActPushMsg, PUSH_MSG, IActPushMsg, TActRegistry, REGISTRY, SEL_USER_MSG, ISelUserMsg, TActSelUserMsg, NEW_CONVO, TActNewConvo, TActOwnProf, OWN_PROFILE } from './actionCreators';
import { findConvoByUsr } from './helpers';


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
            const selUserMsg = action.payload as ISelUserMsg;
            const selPayload = findConvoByUsr(selUserMsg,state.conversationList);
            return {
                ...state,
                toUser: {...selUserMsg},
                currentChat: {
                    id: selPayload?.id || null
                }
            };
        case PUSH_MSG:
            {
                if(!action.payload) return state;
                const id = "id" in action.payload ? action.payload.id : null;
                const convos = state.conversationList || null;
                if (!convos || !id) return state;
                const message = {
                    username: "username" in action.payload ? action.payload.username : "Fail",
                    msg: "msg" in action.payload ? action.payload.msg : "Fail",
                    date: "date" in action.payload ? action.payload.date ? action.payload.date : Date.now() : Date.now()
                };
                const uptConvos = convos.map(
                    function matchConvoId(elem) {
                        if(elem.id === id){
                            const modMessage = elem.messages.concat(message);
                            const newConvo = {...elem, messages:modMessage};
                            return newConvo;
                        };
                        return elem;
                    }
                );
                return {
                    ...state,
                    conversationList: uptConvos
                };
            };
        case NEW_CONVO:
            {
                console.log("before selection\n", action);
                const isConvoArray = Array.isArray(action.payload);
                if(isConvoArray){
                    console.log("inside reducer\n", action.payload);
                    const convosArray = action.payload as IconversationList[];
                    let newState = {...state};
                    const convoList = state.conversationList ? state.conversationList : [];
                    for(let convo of convosArray){
                        newState = {
                            ...state,
                            conversationList: convoList.concat(convo),
                        };
                    };
                    return newState;
                };
                const newConvo = {...action.payload as IconversationList};
                const convoList = "conversationList" in state ? state["conversationList"] : [];
                const resConvo = {
                    ...state,
                    conversationList: convoList?.concat(newConvo),
                    currentChat: {id: newConvo.id}
                };
                console.log(resConvo);
                return resConvo;
            };
        default:
            return state;
    };
};

interface IConversationState {
    conversationList?: IconversationList[];
    toUser?: ISelUserMsg;
    currentChat?: ICurrentChat;
};

export interface ICurrentChat {
    id: string | null;
    members?: Iplayers[];
    kind?: eKind;
};

export enum eKind {
    simple = "simple",
    group = "group"
};

export interface IconversationList {
    id: string | null;
    members: Iplayers[];
    messages: IActPushMsg[];
    updated: number;
    notSent: number;
    kind: eKind;
    chatName: string;
};

export interface Iplayers {
    username:string;
    email?:string;
};

type TActionConversations = TActSelUserMsg | TActPushMsg | TActNewConvo;

// Profile reducer

const initProfile = {
    name: "",
    nickname: "",
    birthday: "",
    email: "",
};

type TpActionProfile = TActOwnProf;

function redProfile(state = initProfile , action: TpActionProfile) {
    console.log("PROFILE", state);
    switch (action.type) {
        case OWN_PROFILE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };
};

// ROOT REDUCER

const combinedReducer = combineReducers({
    login: redUserLogin,
    contacts: redUserContacts,
    conversations: redConversations,
    profile: redProfile,
});

export default combinedReducer;

// export type loginState = ReturnType<typeof redUserLogin>;
// export type contactState = ReturnType<typeof redUserContacts>;
// export type conversationState = ReturnType<typeof redConversations>;

export type typeRootState = ReturnType<typeof combinedReducer>;