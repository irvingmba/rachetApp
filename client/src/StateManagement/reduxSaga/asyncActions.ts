export const ASYNC_CONTACTS = "ASYNC_CONTACTS";
export const SUB_ADD_CONTACT = "SUB_ADD_CONTACT";
export const SUB_GET_CONTACTS = "SUB_GET_CONTACTS";

export type asyncContactAction = ReturnType<typeof asyncAddContact>;
interface baseAction {
  type: string;
};

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