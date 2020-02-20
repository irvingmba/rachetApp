import socket from 'socket.io';
import express from 'express';
import https from 'https';
import fs from "fs";
import path from "path";

const app = express();

app.get("/", (req, res)=> res.send("Testing service"));

const httpsOptions:https.ServerOptions = {
    key: fs.readFileSync(path.resolve(__dirname,'../keys/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'../keys/certificate.pem'))
};
const server = https.createServer(httpsOptions,app);

const ioOptions:socket.ServerOptions = {
    path: "/listen"
};
const io = socket(server);

io.on("connection",function(socket){
    console.log("user connected");
    
    socket.on("notification connected",function(msg){
        console.log(msg);
    });
});

server.listen(4020,()=> console.log(`Messages Server is running on https://localhost:4020/`));