/* File to make the server configuration */
var express = require('express');
var path = require('path');
// Creating the server
var app = express();
var dir = path.resolve(__dirname, "../client/public"), port = 3000;
app.use(express.static(dir));
app.listen(port);
