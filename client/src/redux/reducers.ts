import { combineReducers } from 'redux';
import { LOGIN_REJECTED, LOGIN_SUCCESS } from './actionCreators';
import { loginRejected } from './fnUtilities';

interface IactionUserLogin {
    type: string;
    payload: {};
};

function redUserLogin(state={}, action:IactionUserLogin) {
    console.log(state, action);
    switch(action.type) {
        case LOGIN_REJECTED:
            const rejObj = loginRejected({...action.payload});
            return {...state, ...rejObj};
        case LOGIN_SUCCESS:
            console.log(state);
            return {...state, ...action.payload}
        default:
            return state;
    };
};

const combinedReducer = combineReducers({
    login: redUserLogin
});

export default combinedReducer;

export type stateType = ReturnType<typeof redUserLogin>;