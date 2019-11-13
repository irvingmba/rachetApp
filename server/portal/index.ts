import express from 'express';
import path from 'path';

const app = express();
const port:string = process.env.PORT || "8080";

app.use(express.json());

app.post('/',(req,res)=>{
    console.log(req.body);
});

app.listen(port);