import { SIGNIN } from './actionCreators';
import { IActionSignIn } from '../types/redux';

function redSignInData(state={}, action:IActionSignIn) {
    switch(action.type) {
        case SIGNIN:
            return {...state, ...action.payload};
        default:
            return state;
    };
};

export default redSignInData;