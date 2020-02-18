import { take, call } from "redux-saga/effects"
import { ASYNC_CONTACTS, asyncContactAction, SUB_ADD_CONTACT } from "./asyncActions";
import isEmail from "validator/lib/isEmail";
import { mutAddContact } from "../../requests/http/mutations";
import { addContact } from "../../requests/http/httpRequest";

export function* sagaContacts() {
  // create cases where we are going to handle how we are going to make the request to the server
  while(true){
    const action = yield take(ASYNC_CONTACTS);
    // check the subtype
    // make a switch subroutine
    console.log(action);
    try {
      switch(action.subtype){
        case SUB_ADD_CONTACT:
          const contact = "contact" in action.payload ? action.payload["contact"] : "";
          const contactEmail = yield call(verifyString(isEmail),contact);
          const mutation = yield call(mutAddContact,contactEmail ? {email:contact} : {nickname: contact});
          const response = yield call(addContact,mutation);
          console.log(response);
      };
      
    } catch (error) {
      console.log(error);
    }
    // send to the proper method for the request to the server
  };
  
};

function verifyString(verifier:(x: string)=>boolean) {
  return function(sample:string){
    return verifier(sample);
  };
};