/* File to make the server configuration */

const express =  require('express');
const path = require('path');

// Creating the server
const app = express();

const dir:string = path.resolve(__dirname, "../client/build"), port = 3000;
app.use(express.static(dir));

app.listen(port)