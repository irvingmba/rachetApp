import React, { useReducer } from 'react';
// import axios from 'axios';

// import { inputsLogin } from './elements';
// import { GenForm } from '../../components/formComponents';
// import { mutLogin } from '../../utils/requests';


// function loginUser(data:any){
//     const mutation:any = axios({
//         url: "/gql",
//         method: "POST",
//         data: {
//             query: mutLogin(data.user,data.password)
//         },
//     }).then((res)=>res.data).catch((rej)=>console.log(rej));
//     console.log(mutation);
// };

// const Login:React.FunctionComponent = () => {
//     return (
//         <GenForm 
//         title="Login"
//         url=""
//         inputElements={inputsLogin}
//         callback={loginUser}
//         />
//         );
//     };

// export default Login;

import { getInputNames, arrayToObject, mapInputsToArray } from '../utils/utilForm';
import { inputsLogin } from './elements';

function reducer(state:{},action:{type:string;payload:{}}){
    if(action.type === 'ALTER'){
        return {...state, ...action.payload}
    };
    return state;
};

function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
};

const LoginBlock:React.FunctionComponent<{}> = () => {
    const [state, dispatch] = useReducer(reducer,{});
    const inputElements = mapInputsToArray( inputsLogin, {state, dispatch} );
    const inputWState = inputElements.map( element => {
        return
    } );

    return (
        <form
        onSubmit={handleSubmit}
        >
            {...inputElements}
        </form>
    );
};