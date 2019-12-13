import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

function userReducer(state:{users:string[]},action:{type:string;payload:string[];}) {
    switch(action.type){
        case "load":
            return {users: action.payload};
        default:
            return state;
    };
};


const UserConnected: React.FunctionComponent = () => {
    const init:{users:string[]} = {users:[]};
    const [state,dispatch] = useReducer(userReducer,init);
    const users = axios({
        url: "/info",
        method: "POST",
        data: {
            query: `{
                getContacts {
                    nickname
                    email
                }
            }`
        },
    }).then((res) => {
        if (Array.isArray(res.data.data.getContacts)) {
            const contactList: { nickname: string; email: string }[] = res.data.data.getContacts;
            const elements = contactList.map((contact,index) => {
                return contact.nickname;
            });
            return elements;
        };
    });
    function printContacts(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch({type:"load",payload: Array.isArray(users)? users : []})
    };
    return (
        <div>
            <h1>Contacts</h1>
            <ul>
            {state.users.map((user,index)=>{
                return (
                <li key={"list"+index}>{user}</li>
                );
            })}
            </ul>
            <button onClick={printContacts} />
        </div>
    );
};

export { UserConnected };