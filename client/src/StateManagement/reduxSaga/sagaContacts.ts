import { take, call, put } from "redux-saga/effects"
import { ASYNC_CONTACTS, SUB_ADD_CONTACT, SUB_GET_CONTACTS } from "./asyncActions";
import isEmail from "validator/lib/isEmail";
import { mutAddContact } from "../../requests/http/mutations";
import { addContact, getContacts } from "../../requests/http/httpRequest";
import { qryContactList } from "../../requests/http/queries";
import { actionUpdateContactList } from "../redux/actionCreators";

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
          yield call(console.log, msg, response.data.data.addContact);
          break;
        case SUB_GET_CONTACTS:
          // send the request to the service
          const qryGetContacts = yield call(qryContactList);
          const resGetContacts = yield call(getContacts,qryGetContacts);
          const contactList = resGetContacts.data.data.getContacts
          // get the response and update the state
          yield call(console.log, contactList);
          yield put(actionUpdateContactList(contactList));
      };
      
    } catch (error) {
      console.log(error);
      alert("Something wrong happened, please verify your data");
    }
  };
  
};

function verifyString(verifier:(x: string)=>boolean) {
  return function(sample:string){
    return verifier(sample);
  };
};
