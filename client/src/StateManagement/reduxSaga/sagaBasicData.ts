import { take, call, put } from "redux-saga/effects";
import { ASYNC_PROFILE } from "./asyncActions";
import { qryGetOwnProfile } from "../../requests/http/queries";
import { getOwnProfile, ownProfileData } from "../../requests/http/httpRequest";
import { actionOwnProfile, actionLoginSuccess, Ostatus } from "../redux/actionCreators";

export function* sagaBasicData() {
  while(true){
    try {
      // query the data to the server
      const action = yield take(ASYNC_PROFILE);
      const rawData = yield call(getOwnProfile, qryGetOwnProfile())
      const data = yield call(ownProfileData, rawData);
      if(data && Object.keys(data).length) {
        yield put(actionOwnProfile(data || {}));
        yield put(actionLoginSuccess({user: data.nickname, status: Ostatus.online}));
      };
    } catch (error) {
      console.error("Something went wrong while requesting your basic information", error);
    }
    // store the response and send it to the app state

  };

};

// BASIC DATA
// ownprofile
// contactList