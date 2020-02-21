import socket from 'socket.io';
import express from 'express';
import https from 'https';
import fs from "fs";
import path from "path";

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

const ioOptions:socket.ServerOptions = {
    path: "/conversation"
};
const io = socket(server, ioOptions);

io.on("connection",function(socket){
    console.log("user connected");
    io.emit("this", {will: "be received"});
    
    socket.on("notification connected",function(msg){
        console.log(msg);
    });
});
