//now how to handle http metid in node.js server
//instead of making complex usecases with http module we use express.js framework to handle http methods more easily
 const http=require('http');

 const express=require(`express`);

 const app=express();
 //we will use get method of  GET and we can use any method like POST, DELETEetc
 //then inside bracket we will mention the route on which we will do GET request 
 app.get('/about',(request,respond)=>{
    return respond.send("ABOUT  USING EXPRESS JS");
 })
 //we can use url method as well for parsing without actually requiring url module,as in express everything is built in 
  app.get('/home',(request,respond)=>{
    return respond.send("HOME  USING EXPRESS JS" + request.url.name + 'your age is ' + request.url.age);
 })
 //we can create a server using express frame work by above method and tgen we dont need to use switch case method so we commented it out
//  const myserver =http.createServer((request,res)=>{
//      const log=`${Date.now()}  ${request.method}${request.url} New request have been occured `;
//      fs.appendFile("requestlog.txt",log,(err,data)=>{
//          if(err){
//              console.log("error occured while logging the file",err.message);
 
//          }
//          else{
//              console.log("file have been appended successfully",res.message);

 
//              switch(request.url){
//                  case '/':
//                      res.end("HOMEPAGE");
//                  break;
//                  case '/about':
//                      res.end("ABOUT PAGE");
//                  break;
//                  case '/signup':
//                     if(request.method==="GET"){
//                         res.end("this is signup form");
//                     }else if (request.method==="POST"){
//                         //db query to find user and save the data

//                         res.end("form data has been submitted successfully");
//                     }
//                  default:
//                      res.end("404 PAGE NOT FOUND");
//                  break;    
//              }
//          }
//      });
//  })
//to create post request in express
app.post('/signup',(request,respond)=>{
    //db query to find user and save the data
    return respond.send("form data has been submitted successfully USING EXPRESS JS");
});
 //so using this express we can remove the ugly looking switch case and also we wont need to use const myserver=http.createServer(app); and also no need to write listen method separately

//  const myserver=http.createServer(app);
//  myserver.listen(7000,()=>console.log("server is listening on port 7000"));


app.listen(7000,()=>console.log("server is listening on port 7000 USING EXPRESS JS"));



///EXPRESS JS MAKES IT VERY EASY TO HANDLE HTTP METHODS AND ROUTING
///ALSO EXPRESS IS JUST A FRAMEWORK AND INTERNALLY HTTP MODULE IS USED SO EVERYTHING IS BUILT ON TOP OF HTTP MODULE

//http mai code likhna is painful,so we would write code in express js now onwards