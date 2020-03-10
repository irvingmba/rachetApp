import socket, { Server } from 'socket.io';
import express from 'express';
import https from 'https';
import fs from "fs";
import path from "path";
import { lazyRequest } from './Requests/toAuthServer';
import { storeMsgNResp } from './socketFns';
import { getOwnId, searchActionId, memoContacts, memoConvos} from "./Requests/queryInfo";
import { joinRoomsOfQry, onlineMsg2All, svr2RoomOn, getIdStr, createUsrRoom, join2ConvoRooms} from './socketFns/rooms';
import { convos2Client } from './socketFns/conversations';
import { updateSocket } from './socketFns/customFns';
import { listenMessage, ackResponse } from './socketFns/listener';

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
let authCookie = "";

io.use(async function(socket,next) {
    const cookieName = "token";
    const headers = "headers" in socket.request ? socket.request["headers"] : "";
    const cookies:string = "cookie" in headers ? headers["cookie"] : "";
    const cookieArr = cookies.split(";");
    for(const cookie of cookieArr){
        const trimed = cookie.trim();
        const temp = trimed.indexOf(cookieName);
        if(temp != -1) authCookie = trimed;
    };
    const cookieValue = authCookie.substr(cookieName.length+1);
    const authResp = await lazyRequest(cookieValue);
    if(!authResp) return;
    console.log(authResp?.data);
    next();
});


io.on("connection",async function(socket){
    console.log("user connected", socket.id);
    io.emit("this", {will: "be received"});
    // Initializing variables
    const ownId = await getOwnId(authCookie);
    const idStr = getIdStr(ownId);
    const getContacts = memoContacts(authCookie);
    const getAction = await searchActionId(authCookie, idStr);
    const action = await getAction();
    const getConvos = await memoConvos(getAction);
    const initObj = {
        ownId: idStr,
        contacts: getContacts,
        action: getAction,
        convos: getConvos
    };
    
    const updSocket2Client = updateSocket(socket);
    // Initializing contacts;
    const idCons = await getContacts();
    console.log("contacts\n", idCons);
    // Joining and creating notifications room
    joinRoomsOfQry(socket, idCons);
    const userRoom = createUsrRoom(io, ownId);
    userRoom("notifOnline", ownId);
    join2ConvoRooms(socket, action);
    // send the conversations info to the client through an event
    const convos = await convos2Client(action, idCons);
    if(convos) updSocket2Client("pushConvo")(convos);

    socket.on("message",
    async function(payload){
        console.log("new message\n", payload);
        const response = await listenMessage({...payload, ...initObj});
        if(!response || !("type" in response)) return;
        console.log("listener return", response);
        // if there is a response emit an ack event to the users in the room
        const reply = ackResponse(socket, response, io);
        console.log("ack reply returned\n",reply);
    });

    socket.on("print", function(msg){
        console.log(msg);
    })
});


// Functions for local purposes
