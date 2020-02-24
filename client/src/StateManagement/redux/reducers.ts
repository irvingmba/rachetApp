import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, UPDATE_CONTACTS, SELECT_CONTACT, TActSelectContact, TActUpdateContactList, ISelectContact, Ostatus, TActLoginSuccess } from './actionCreators';


/* ------------- REDUCERS ----------------- */

function redUserLogin(state: ILoginState = {status: Ostatus.offline}, action:TActionLogin) {
    console.log("LOGIN",state);
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state;
    };
};

interface ILoginState {
    user?: string;
    status?: Ostatus;
    name?: string;
    email?: string;
    birthday?: Date;
};

type TActionLogin = TActLoginSuccess;

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

// function redConversations(state = {}, action){
//     switch(action.type){
//         default:
//             return state;
//     };
// };


// ROOT REDUCER

const combinedReducer = combineReducers({
    login: redUserLogin,
    contacts: redUserContacts
});

export default combinedReducer;

export type loginState = ReturnType<typeof redUserLogin>;
export type contactState = ReturnType<typeof redUserContacts>;

export type typeRootState = ReturnType<typeof combinedReducer>;