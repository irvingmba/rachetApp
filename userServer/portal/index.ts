import express from 'express';
import path from 'path';

const app = express();
const port:string = process.env.PORT || "8080";

app.use(express.json());

app.post('/portal',(req,res)=>{
    console.log(req.body);
    res.send("Sucessful trasnfer");
});

app.listen(port,()=>console.log(`Server on port ${port}`));