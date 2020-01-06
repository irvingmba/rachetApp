import { combineReducers } from 'redux';
import { LOGIN_REJECTED } from './actionCreators';
import { loginRejected } from './fnUtilities';

interface IactionUserLogin {
    type: string;
    payload: {};
};

function redUserLogin(state={}, action:IactionUserLogin) {
    switch(action.type) {
        case LOGIN_REJECTED:
            const rejObj = loginRejected({...action.payload});
            return {...state, ...rejObj};
        default:
            return state;
    };
};

const combinedReducer = combineReducers({
    Login: redUserLogin
});

export default combinedReducer;