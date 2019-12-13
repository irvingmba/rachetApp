import { GraphQLServer } from 'graphql-yoga'
import socket from 'socket.io';
import express from 'express';
import https from 'https';

const app = express();
const httpsOptions:https.ServerOptions = {
    key: "./Messages/keys/key.pem",
    cert: "./Messages/keys/certificate.pem"
};
const server = https.createServer(httpsOptions,app);

const ioOptions:socket.ServerOptions = {
    path: "/listen"
};
const io = socket(server);

io.on("connection",function(socket){
    socket.on("notification connected",function(msg){
        console.log(msg);
    });
});