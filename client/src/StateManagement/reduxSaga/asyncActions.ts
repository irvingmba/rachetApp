export const ASYNC_CONTACTS = "ASYNC_CONTACTS";
export const SUB_ADD_CONTACT = "SUB_ADD_CONTACT"

export type asyncContactAction = ReturnType<typeof asyncAddContact>;

export function asyncAddContact(payload: {}){
  return {
    type: ASYNC_CONTACTS,
    subtype: SUB_ADD_CONTACT,
    payload
  };
};
