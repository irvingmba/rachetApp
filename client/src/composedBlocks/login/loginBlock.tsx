import React, { useReducer, useState } from 'react';
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

import { mapInputsToArray, getInputNames } from '../utils/utilForm';
import { inputsLogin } from './elements';
import { simpleFormReducer } from '../utils/FormReducers'

const LoginBlock:React.FunctionComponent<{}> = () => {
    const [state, dispatch] = useReducer(simpleFormReducer,{});
    const inputElements = mapInputsToArray( inputsLogin, {state, dispatch} );
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state);
    };
    return (
        <form
        onSubmit={handleSubmit}
        >
            {...inputElements}
        </form>
    );
};

export default LoginBlock;