const fs=require('fs');

//then we call a synchronous call to create a file in current directory denote"./" called as test.txt where content is hey there
// fs.writeFileSync("./test.txt","Hey there"); 
//for async call,where we get callback function where we get error if any
// fs.writeFile("./test.txt","Hey there", (err)=>{
//     console.log("File created");
// });

//to read a file called contact.txt in current directory denoted by ./
//async file doesnt retunt anything , we get result in callback function.it expexcts two parameters error and result in callback function
// const result=fs.readFile("./contact.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }else{
//         console.log(result);
//     }
// })
// console.log(result);

//now to add data to text file we use appendFile or appendFileSync.We dont overwrite the existing data but add data at the end of file

fs.appendFileSync("./test.txt",new Date().getDate.tolocaleString());

//to rename a file we use fs.rename or fs.renameSync
fs.renameSync("./test.txt","newTest.txt");

//to delete a file we use fs.unlink or fs.unlinkSync
fs.unlinkSync("./newTest.txt");

//to see the status of any file
fs.stat("./contact.txt",(err,stats)=>{
    if(err){
        console.log("Error",err);
    }else{
        console.log(stats);
    }
}
);

//to create a directory we use mkdir or mkdirSync,and we can create nested directories using recursive:true option
fs.mkdirSync("my-docs/a/b",{recursive:true});
