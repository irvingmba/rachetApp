import { take } from "redux-saga/effects"
import { ASYNC_CONTACTS } from "./asyncActions";

export function* sagaContacts() {
  // create cases where we are going to handle how we are going to make the request to the server
  while(true){
    const action = yield take(ASYNC_CONTACTS);
    // check the subtype
    // make a switch subroutine
    // send to the proper method for the request to the server
  };
  
};