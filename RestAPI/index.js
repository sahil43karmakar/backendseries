// const express=require(`express`);
// const app=express();
// //pointing to mockdata folder ,so that we can work on the data
// const users=require("./MOCK_DATA.json");
// const PORT= 8000;
// //we see route /api/users/:id  is  used at many place for PATCH,DELETE,GET we can merge  so thatif we need to change the route we do in one place only  and for each route we perform different operation like get ,put,delete handler function
// app.route('/api/users/:id').get((request,response)=>{
//       const id=Number(request.params.id);
//     //now i need to find the id in my json file 
//     const UseraccordingtoID=users.find(user=>user.id===id)
//     return response.json(UseraccordingtoID);
// })
// .patch((request,response)=>{return response.json({status:"pending"})})
// .delete((request,response)=>{
//     //delete the user with id
//     return response.json({status:"pending"})
// });


// //now task 1: create a route /users which will return all the users present in the MOCK_DATA.json file
// //for web app we create a route only /users beacsue web apps can work with html format also and we will throught html format beause web apps work better with html format
// //we comment th ebelow code as we have merged it on the basus on same route /api/users/:id
// app.get("/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find(u => u.id === id);

//   if (!user) {
//     return res.status(404).send("<h1>User not found</h1>");
//   }

//   const html = `
//     <h1>${user.first_name} ${user.last_name}</h1>
//     <p>Email: ${user.email}</p>
//     <p>Gender: ${user.gender}</p>
//     <p>Job Title: ${user.job_title}</p>
//   `
//   res.send(html);
// });
// // so for mobile app we create a route /api/users and will throw the data in json format becasue mobile apps work with json data
// app.get("/api/users",(request,response)=>{
//     //as we work with json data we need to use response.json method
//     return response.json(users); 
// })
// //NOW TASK 2:where we need dynamic path paramenter that is :id, /users/:id which will return the user based on the id passed in the route(:id ,denotes dynamic path parameter) 
// //we merge the get and patch delete into dame handler using app.route
// // app.get("/api/users/:id",(reuquest,response)=>{
// //     const id=Number(request.params.id);
// //     //now i need to find the id in my json file 
// //     const UseraccordingtoID=users.find(user=>user.id===id)
// //     return response.json(UseraccordingtoID);
// // })

// //TASK 3: post request,but browser by default does GET reuqest ,so post patch,delete is problematic
//  //below code are merged together using app.route,so we comment them
// app.post("/api/users",(request,response)=>{
//     //todo:create a new user
//     return response.json({status:"pending"})
// })
// // app.patch("/api/users/:id",(request,response)=>{
// //     //todo:edit the user with id
// //     return response.json({status:"pending"})
// // })
// // app.delete("/api/users/:id",(request,response)=>{
// //     //todo:delete the user with id
// //     return response.json({status:"pending"})
// // })
// app.listen(PORT,()=>console.log('Server started'));





// //IN NEXT MODULE WE WILL USE POSTMAN TO TEST OUR POST ,PATCH AND DELETE REQUESTS

// new code again


// Step 1: Import express (server banane ke liye) aur fs (file read/write ke liye)
const express = require('express');
const fs = require('fs');
const { findPackageJSON } = require('module');

const app = express();
const PORT = 3000;
//parse-convert the incoming data to json format
// Step 2: Middleware (yeh line ensure karti hai ki jo data Postman se aayega wo samajh aaye)
// express.json() → agar tum raw JSON bhejoge
// express.urlencoded() → agar tum x-www-form-urlencoded form data bhejoge
//- Jab Postman se data bhejoge, wo raw JSON ya form data ho sakta hai.
// - Middleware ensure karta hai ki req.body mein wo data aa jaye as a JavaScript object

app.use(express.json());  // ye line JSON data ko read karke JavaScript object mein convert karti hai

app.use(express.urlencoded({ extended: true }));

// ------------------- ROUTES -------------------

// Step 3: GET all users (API)
// Jab tum GET http://localhost:3000/api/users call karoge,
// yeh pura MOCK_DATA.json file read karega aur sab users return karega
app.get('/api/users', (req, res) => {
    fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        res.json(JSON.parse(data)); // pura users list bhej do
    });
});

// Step 4: GET user by ID
// Agar tum GET http://localhost:3000/api/users/5 call karoge,
// to id=5 wala user search karke return karega
app.get('/api/users/:id', (req, res) => {
    fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        const users = JSON.parse(data);

        const id = Number(req.params.id); // URL se id nikalna
        const user = users.find(u => u.id === id); // us id ka user search karna

        res.json(user || {}); // agar mila to bhejna, nahi mila to empty object
    });
});

// Step 5: POST new user
// Jab tum Postman se POST http://localhost:3000/api/users call karoge,
// aur body mein naya user bhejoge, to yeh file mein add karega
app.post('/api/users', (req, res) => {
    fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        const users = JSON.parse(data);

        // Naya user banado (Postman se jo data aaya uske saath id add karke)
        const newUser = { ...req.body, id: users.length + 1 };
        users.push(newUser);

        // File update karo (JSON.stringify with null,2 → pretty print)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "File write error" });
            res.json({ status: 'Success', id: newUser.id }); // Success response bhejo
        });
    });
});


// Step 6: DELETE user by ID
// Jab tum DELETE http://localhost:3000/api/users/5 call karoge,
// to id=5 wala user file se hata diya jaayega
app.delete('/api/users/:id', (req, res) => {
    // Har baar file read karna zaroori hai taaki latest data mile
    // - Yaha 'utf-8' batata hai ki file ko UTF‑8 encoding ke hisaab se read karo.

    fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read unsuccessful" });

        let users = JSON.parse(data); // file ko JS array mein convert karo
        const id = Number(req.params.id); // URL se id lo

        // Filter karo: sirf wo users rakho jinka id match nahi karta
        users = users.filter(user => user.id !== id);

        // Updated list ko file mein dobara likho
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "File write unsuccessful" });
            res.json({ status: 'Success', message: `User with id ${id} deleted` });
        });
    });
});


// ------------------- SERVER -------------------

// Step 6: Server start karo
// Ye line server ko port 3000 pe start karegi
// Ab tum Postman ya browser se http://localhost:3000/... pe request bhej sakte ho
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

