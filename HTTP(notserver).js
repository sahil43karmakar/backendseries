//now how to handle http metid in node.js server
 const http=require('http');
 const fs=require('fs');
 
 //we can create a server 
 const myserver =http.createServer((request,res)=>{
     const log=`${Date.now()}  ${request.method}${request.url} New request have been occured `;
     fs.appendFile("requestlog.txt",log,(err,data)=>{
         if(err){
             console.log("error occured while logging the file",err.message);
 
         }
         else{
             console.log("file have been appended successfully",res.message);

 
             switch(request.url){
                 case '/':
                     res.end("HOMEPAGE");
                 break;
                 case '/about':
                     res.end("ABOUT PAGE");
                 break;
                 case '/signup':
                    if(request.method==="GET"){
                        res.end("this is signup form");
                    }else if (request.method==="POST"){
                        //db query to find user and save the data

                        res.end("form data has been submitted successfully");
                    }
                 default:
                     res.end("404 PAGE NOT FOUND");
                 break;    
             }
         }
     });
 })
 myserver.listen(7000,()=>console.log("server is listening on port 7000"));