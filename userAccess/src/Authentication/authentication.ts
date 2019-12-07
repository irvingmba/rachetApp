import jwt from 'jsonwebtoken';

const secret = "I haven't finished the chat application";

const encOptions: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
};

const decOptions: jwt.VerifyOptions = {
    algorithms: ['HS256'],
};

export function sign( payload: {id:string;} ) {
    return jwt.sign( payload, secret, encOptions );
};

export function decode( token:string ) {
    return jwt.verify( token, secret, decOptions );
};