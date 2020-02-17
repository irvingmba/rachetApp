import { take, call, put } from "redux-saga/effects";

// declare the const for the asyn action
export const ASYNC_BASIC_DATA = "ASYNC_BASIC_DATA";

// Build a saga to request the basic information to the services
export function* sagaBasicData() {
  // Begin the loop
  while(true){
    // make a try catch block
    try {
      // query the data to the server
      
    } catch (error) {
      
    }
    // store the response and send it to the app state

  };

};