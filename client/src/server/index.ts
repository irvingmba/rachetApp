import express from "express";
import path from "path";
import https from "https";
import fs from "fs";

const app = express();
const port = 3000;


app.use(express.static(path.resolve(__dirname,"../", "public")));

app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname,"../","public/index.html"));
});

const httpsOptions:https.ServerOptions = {
  key: fs.readFileSync(path.resolve(__dirname,'../keys/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname,'../keys/certificate.pem'))
};
const server = https.createServer(httpsOptions,app);

server.listen(port,
  function(){
    console.log(`Running on port ${port}`);
  });