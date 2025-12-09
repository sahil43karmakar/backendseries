//we install npm package called url to work with url,as it helps to parse url and get different parts of url
const http=require('http');
const fs=require('fs');
const url=require('url');

//we can create a server 
const myserver =http.createServer((request,res)=>{
    const log=`${Date.now()} ${request.url} New request have been occured `;

    fs.appendFile("requestlog.txt",log,(err,data)=>{
        if(err){
            console.log("error occured while logging the file",err.message);

        }
        else{
            console.log("file have been appended successfully",res.message);
            //so we to break different part of the url ,we now parse it(breaking different parts of url).
            //true means we want to parse the query string as well into an object
            const parsedurl=url.parse(request.url,true);

            switch(parsedurl.pathname){
                case '/':
                    res.end("HOMEPAGE");
                break;
                case '/about':
                    const username=parsedurl.query.myname;
                    
                    res.end(`hi ,${username} welcome to about page`);
                break;
                //for google when we search something it comes after /search?search =something,so we make a case
                case '/search':
                    const searchuser=parsedurl.query.search;
                    //now sending the respond back to user
                    res.end(`you have searched for ${searchuser}`);
                default:
                    res.end("404 PAGE NOT FOUND");
                break;    
            }
        }
    });
})
myserver.listen(7000,()=>console.log("server is listening on port 7000"));