import { combineReducers } from 'redux';
import { LOGIN_REJECTED, LOGIN_SUCCESS, UPDATE_CONTACTS } from './actionCreators';
import { loginRejected } from './fnUtilities';

// Definition of constants over the reducers
const connected = "connected",
username = "username",
name = "name",
email = "email",
birthday = "birthday";

// define the values for the different namespaces in the state
const loginProps = [
    "connected",
    "username",
    "name",
    "email",
    "birthday"
];
const contactProps = [
    "nickname",
    "email"
];
// make a function to discriminate elements from a function based on the values of an array
function pickProperties(props:string[], obj:{[x:string]:string | boolean}){
    if(!props.length) return {};
    let newObject = {};
    for(const prop of props){
        if(prop in obj) newObject = {...newObject, [prop]: obj[prop] };
    };
    return newObject
};

interface Iaction {
    type: string;
    payload: {};
};

function redUserLogin(state={connected: false}, action:Iaction) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...state, ...action.payload}
        // make a ALTER_DATA case
        // use the function to discriminate unnecesary properties and return the state
        default:
            return state;
    };
};

function redUserContacts(state={}, action:Iaction) {
    switch(action.type) {
        case UPDATE_CONTACTS:
            return {...state, contactList:action.payload};
        default: 
            return state;
    };
};

const combinedReducer = combineReducers({
    login: redUserLogin,
    contacts: redUserContacts
});

export default combinedReducer;

export type loginState = ReturnType<typeof redUserLogin>;
export type contactState = ReturnType<typeof redUserContacts>;

export type typeRootReducer = ReturnType<typeof combinedReducer>;