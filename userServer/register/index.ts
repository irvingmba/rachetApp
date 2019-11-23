import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { body, check, validationResult } from 'express-validator';

const app = express();
const port:string = process.env.PORT || "8080";
const httpsPort:string = process.env.HTTPSPORT || "8081";

app.use(express.json());
app.use((req,res)=>console.log(req.body));

app.post('/API/register', [
    body('name', 'Name must contain only letters')
    .isAlpha("en-US")
    .isLength({min:3, max: 30})
    .trim(),
    (req:express.Request,res:express.Response)=>{
        try{
            validationResult(req).throw();
            res.send("Passed")
        }
        catch (e) {
            res.status(442);
            
        };
        console.log(req.body);
        res.send("Sucessful transfer");
    }
]);

app.get('/', (req, res) => {
    console.log('Success');
    res.send('Sucessfully');
});

http.createServer(app).listen(port);
https.createServer({
    key: fs.readFileSync(path.resolve(__dirname,'../ssl/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'../ssl/certificate.pem')),
    // passphrase:"RACHEL"
},app).listen(httpsPort);