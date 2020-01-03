import axios from "axios";

export function loginUser(query: string){
    const mutation:any = axios({
        url: "/gql",
        method: "POST",
        data: {
            query
        },
    }).then((res)=>res.data).catch((rej)=>console.log(rej));
    console.log(mutation);
};