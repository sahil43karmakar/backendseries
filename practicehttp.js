// //we need https
// const htttp=require('http');
// const file=require('fs');
// //now we imported the module , we now create the server using createServer method of http module saved by variable htttp

// const myserver=htttp.createServer((request,response)=>{
//     const logged_data=`${Date.now()} ${request.url} New request is made from client`;
//     //we now create a file which append data based on user requested url

//     if(err){
//         console.log("error occured while appending data ",err.message);
//     }
//     else{
//         console.log("file have been appended succesfully");
//         //then we do routing if file is appended successfully
//         fs.appendFile("requestofclient.txt",log,(err,data)=>{
//             switch(request.url){
//                 case '/':
//                     //if url is this we end the response with homepage
//                     responss.end("HOMEPAGE");
//                 break;
//                 case '/about':
//                     response.end("ABOUT PAGE");
//                 break;
//                 default:
//                       response.end("url not found 404 error");
//                       break;      


//             }
//         })
//     }



   

// })
// //we need port number for server to listen 
// myserver.listen(9000,()=>console.log("server is listening on port 9000"));


const http=require('http');
const fs=require('fs');

//we can create a server 
const myserver =http.createServer((request,res)=>{
    const log=`${Date.now()} ${request.url} New request have been occured `;
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
                default:
                    res.end("404 PAGE NOT FOUND");
                break;    
            }
        }
    });
})
myserver.listen(7000,()=>console.log("server is listening on port 7000"));