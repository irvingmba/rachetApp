import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import { inputsLogin } from './elements';
import { GenForm } from '../../components/formComponents';
import { mutLogin } from '../../utils/requests';


function loginUser(data:any){
    const mutation:any = axios({
        url: "/gql",
        method: "POST",
        data: {
            query: mutLogin(data.user,data.password)
        },
    }).then((res)=>res.data).catch((rej)=>console.log(rej));
    console.log(mutation);
};

const Login:React.FunctionComponent = () => {
    return (
        <GenForm 
        title="Login"
        url=""
        inputElements={inputsLogin}
        callback={loginUser}
        />
        );
    };

export default Login;