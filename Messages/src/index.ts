import socket from 'socket.io';
import express from 'express';
import https from 'https';
import fs from "fs";
import path from "path";
import { lazyRequest } from './Requests/toAuthServer';

export const DEVELOPMENT_MODE = true;

// Express configuration

const app = express();

app.get("/", (req, res)=> {
    console.log(req);
    res.send("Testing service")
});

const httpsOptions:https.ServerOptions = {
    key: fs.readFileSync(path.resolve(__dirname,'../keys/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'../keys/certificate.pem'))
};
const server = https.createServer(httpsOptions,app);

server.listen(4020,()=> console.log(`Messages Server is running on https://localhost:4020/`));

// Socket.io configuration

const ioOptions:socket.ServerOptions = {
    path: "/conversation"
};
const io = socket(server, ioOptions);

io.use(async function(socket,next) {
    const cookieName = "token";
    const headers = "headers" in socket.request ? socket.request["headers"] : "";
    const cookies:string = "cookie" in headers ? headers["cookie"] : "";
    const cookieArr = cookies.split(";");
    let chosen = "";
    for(const cookie of cookieArr){
        const trimed = cookie.trim();
        const temp = trimed.indexOf(cookieName);
        if(temp != -1) chosen = trimed;
    };
    const cookieValue = chosen.substr(cookieName.length+1);
    const authResp = await lazyRequest(cookieValue);
    console.log(authResp?.data);
    next();
});

io.on("connection",function(socket){
    console.log("user connected");
    io.emit("this", {will: "be received"});
    
    socket.on("notification connected",function(msg){
        console.log(msg);
    });
});

// Functions for local purposes

function handleError() {};