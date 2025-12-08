const http=require('http');
const fs=require('fs');
const { deflate } = require('zlib');
//using the hhtp we can create a server which listens to requests and sends responses
//below we create a web server using createServer method of http module
//now we need a handler function which will handle requests and responses and process the request 
//createServer method takes a callback function as parameter which has two parameters request  and respond 
//below function is for any request send to server
const myserver=http.createServer((req,res)=>{
    //jab bhi user request bheje to we do appendfile or we keep a log that when and at what time request was made to server
    const log=`${Date.now()} ${req.url}:New Request Made\n`;
    //jab append ho jayega successfully then only we send message to user hello from server 

    fs.appendFile("requests.txt",log,(err,data)=>{ 
        //we can create simple routing using url property of req object
        //humlog yha pe simple routing kar rahe hai using switch case,which checks the url and sends response accordingly
        switch(req.url){
            case '/':
                res.end("Homepage")
            break;
            case '/about':
                res.end("About page")
            break;
            default:
                res.end("404 Page Not Found")
            break;    
        }
    });
    //console log if any request came to server 
    console.log("Request has been made from browser to server");
    //then we end the response using res.end method\
   

})
//we need port number for server to listen to requests over a port number 8000
//if sab kuch is fine then we can see the message in console
myserver.listen(8000,()=>console.log("Server is listening on port 8000"));
//8000 was our port number where server is listening to requests