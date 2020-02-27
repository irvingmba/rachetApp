
/* Constants for asynchronous action types*/
// Contacts
export const ASYNC_CONTACTS = "ASYNC_CONTACTS";
export const SUB_ADD_CONTACT = "SUB_ADD_CONTACT";
export const SUB_GET_CONTACTS = "SUB_GET_CONTACTS";
// Conversations
export const ASYNC_MSGS = "ASYNC_MSGS";
export const SUB_MSGS_SEND = "SUB_MSGS_SEND";

export type asyncContactAction = ReturnType<typeof asyncAddContact>;
interface baseAction {
  type: string;
};

/* ----- ASYNC ACTIONS ------ */

// Contacts

export function asyncAddContact(payload: {}){
  return {
    type: ASYNC_CONTACTS,
    subtype: SUB_ADD_CONTACT,
    payload
  };
};

export function asyncGetContacts(payload:{}){
  const props = {
    subtype: SUB_GET_CONTACTS,
    payload
  };
  return addProps2Action(props)(ASYNC_CONTACTS);
};

// Conversations

export function asyncSendMsg(payload: IAsyncSendMsg) {
  return {
    type: ASYNC_MSGS,
    subtype: SUB_MSGS_SEND,
    payload: {...payload}
  };
};

interface IAsyncSendMsg {
  user: {
    username: string;
    email: string;
  } | unknown;
  message: string;
};

/* ------ LOCAL FUNCTIONS --------- */

function makeBasicAction(type:string){
  return {
    type
  };
};

function addProps2Action(props: {}) {
  return function (type:string){
    return {...props, ...makeBasicAction(type)};
  };
};