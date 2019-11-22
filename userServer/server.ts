/* File to make the server configuration */

const express =  require('express');
const path = require('path');

// Creating the server
const app = express();

const port:string = process.env.PORT || "8080";

app.listen(port)