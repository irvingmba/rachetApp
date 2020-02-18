export const ASYNC_CONTACTS = "ASYNC_CONTACTS";
export const SUB_ADD_CONTACT = "SUB_ADD_CONTACT"

export function asyncAddContact(subtype: string, payload: {}){
  return {
    type: ASYNC_CONTACTS,
    subtype: SUB_ADD_CONTACT,
    payload
  };
};