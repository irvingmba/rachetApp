// *********** Action constants ************

// LOGIN
export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";
// CONTACTS
export const UPDATE_CONTACTS = "UPDATE_CONTACTS";
export const SELECT_CONTACT = "SELECT_CONTACT";
// CONVERSATIONS
export const PUSH_MSG = "PUSH_MSG";

/* ---------------- ACTIONS --------------- */

// Login section
interface ILoginSuccess {
    user: string;
    status: Ostatus;
    password?: boolean;
};

export enum Ostatus {
    online = "online",
    offline = "onffline"
};

export function actionLoginSuccess({user, status}:ILoginSuccess){
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user,
            status
        }
    };
};

export type TActLoginSuccess = ReturnType<typeof actionLoginSuccess>;


// Contacts Section
export function actionUpdateContactList(data:[]){
    return {
        type: UPDATE_CONTACTS,
        payload: data
    };
};

export type TActUpdateContactList = ReturnType<typeof actionUpdateContactList>;

export function actionSelectContact(data: ISelectContact){
    return {
        type: SELECT_CONTACT,
        payload: {...data}
    };
};

export interface ISelectContact {
    username: string;
    email?: string;
};

export type TActSelectContact = ReturnType<typeof actionSelectContact>;

// Messages section

export function actionPushMsg(msg: IActPushMsg) {
    return {
        type: PUSH_MSG,
        payload: {...msg}
    };
};

export interface IActPushMsg {
    username: string;
    msg: string;
    date?: Date;
};

export type TActPushMsg = ReturnType<typeof actionPushMsg>;