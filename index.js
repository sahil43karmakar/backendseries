const fs=require("fs");
//below is the middleware function which logs the request and response details to a file named log.txt
//below it s a closure
function logReqRes(filename){
    return function(req,res,next){
           fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
    (err) => {
      if (err) {
        console.error(err);
      }
      next();
    }
  );
}
};


module.exports={logReqRes};