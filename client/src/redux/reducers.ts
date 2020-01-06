import { combineReducers } from 'redux';
import { USER_LOGIN } from './actionCreators';

interface IactionUserLogin {
    type: string;
    payload: {};
};

function redUserLogin(state={}, action:IactionUserLogin) {
    switch(action.type) {
        case USER_LOGIN:
            return {...state, ...action.payload};
        default:
            return state;
    };
};

const combinedReducer = combineReducers({
    Login: redUserLogin
});

export default combinedReducer;