import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();
const port:string = process.env.PORT || "8080";
const httpsPort:string = process.env.HTTPSPORT || "8081";

app.use(express.json());
app.use((req,res)=>console.log(req.body));

app.post('/API/rls');

app.get('/', (req, res) => {
    console.log('Success');
    res.send('Sucessfully');
});

http.createServer(app).listen(port);
https.createServer({
    key: fs.readFileSync(path.resolve(__dirname,'./keys/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'./keys/certificate.pem')),
},app).listen(httpsPort);