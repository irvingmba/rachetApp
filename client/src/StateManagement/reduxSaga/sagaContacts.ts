import { take, call } from "redux-saga/effects"
import { ASYNC_CONTACTS, asyncContactAction, SUB_ADD_CONTACT, SUB_GET_CONTACTS } from "./asyncActions";
import isEmail from "validator/lib/isEmail";
import { mutAddContact } from "../../requests/http/mutations";
import { addContact } from "../../requests/http/httpRequest";

export function* sagaContacts() {
  while(true){
    const action = yield take(ASYNC_CONTACTS);
    try {
      switch(action.subtype){
        case SUB_ADD_CONTACT:
          const contact = "contact" in action.payload ? action.payload["contact"] : "";
          const contactEmail = yield call(verifyString(isEmail),contact);
          const mutation = yield call(mutAddContact,contactEmail ? {email:contact} : {nickname: contact});
          const response = yield call(addContact,mutation);
          const msg = response.data.data.addContact ? "Friendship request sended" : "Couldn't find your friend, please check your data";
          yield call(alert, msg);
          yield call(console.log, msg);
        case SUB_GET_CONTACTS:
          
      };
      
    } catch (error) {
      console.log(error);
    }
  };
  
};

function verifyString(verifier:(x: string)=>boolean) {
  return function(sample:string){
    return verifier(sample);
  };
};