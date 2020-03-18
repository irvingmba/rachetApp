import { IconversationList } from "./reducers";

// *********** Action constants ************

// LOGIN
export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";
export const REGISTRY = "REGISTRY";
// CONTACTS
export const UPDATE_CONTACTS = "UPDATE_CONTACTS";
export const SELECT_CONTACT = "SELECT_CONTACT";
// CONVERSATIONS
export const SEL_USER_MSG = "SEL_USER_MSG";
export const PUSH_MSG = "PUSH_MSG";
export const NEW_CONVO = "NEW_CONVO";
// PROFILE
export const OWN_PROFILE = "OWN_PROFILE";

/* ---------------- ACTIONS --------------- */

// Login section
interface ILoginSuccess {
    user: string;
    status: Ostatus;
    password?: boolean;
};

interface IRegistry {
    registry: boolean;
};

export enum Ostatus {
    online = "online",
    offline = "offline"
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

export function actionRegistry(payload: IRegistry) {
    return {
        type: REGISTRY,
        payload: {...payload}
    };
};

export type TActLoginSuccess = ReturnType<typeof actionLoginSuccess>;
export type TActRegistry = ReturnType<typeof actionRegistry>;

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

export function actionSelUserMsg(user: ISelUserMsg) {
    return {
        type: SEL_USER_MSG,
        payload: {...user}
    };
};

export interface ISelUserMsg {
    username: string;
    email?: string;
};

export function actionPushMsg(msg: IActPushMsg | null) {
    if(!msg) return {type:""};
    return {
        type: PUSH_MSG,
        payload: {...msg}
    };
};

export function actionNewConvo(convo: IconversationList|IconversationList[]) {
    console.log(convo);
    return {
        type: NEW_CONVO,
        payload: Array.isArray(convo) ? [...convo] : {...convo}
    };
};

export interface IActPushMsg {
    username: string;
    msg: string;
    date?: number;
    id?: string;
};

export type TActPushMsg = ReturnType<typeof actionPushMsg>;
export type TActSelUserMsg = ReturnType<typeof actionSelUserMsg>;
export type TActNewConvo = ReturnType<typeof actionNewConvo>;

// Profile section

export function actionOwnProfile(profile: InProfile) {
    return {
        type: OWN_PROFILE,
        payload: {...profile}
    };
};

interface InProfile {
    name: string;
    nickname: string;
    birthday: string;
    email: string;
};

export type TActOwnProf = ReturnType<typeof actionOwnProfile>;