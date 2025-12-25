// const express = require('express');
// const fs = require('fs');
// const { findPackageJSON } = require('module');
// const mongoose=require("mongoose");


// const app = express();
// const PORT = 3000;
// //now we do connection with mongoose
// mongoose.connect("mongodb://127.0.0.1:27017/SecondDb")
// .then(()=>console.log("Mongoose connected successfully"))
// .catch((err)=>console.log("Error in mongoose connection",err.message));

// //1->making schema
// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   jobTitle: {
//     type: String
//   },
//   gender: {
//     type: String
//   }
// });
// //2-> we give name to the model known as User and pass the schema caled as userSchema
// const User = mongoose.model('User', userSchema);


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((request, response, next) => {
//     // console.log("Hello from middleware 1, after middleware 0");
//     return response.json({ msg: 'hellow from middleware 1' });
//     request.myUserName = "sahil karmakar";
//     next();
// });

// app.use((request, response, next) => {
//     console.log("Hello from middleware 2, after getting passed from middleware 1 using next()", request.myUserName);
//     return response.json({ msg: 'hellow from middleware 1' });
//     next();
// });

// app.get('/api/users', (req, res) => {
//     fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
//         if (err) return res.status(500).json({ error: "File read error" });
//         res.json(JSON.parse(data));
//     });
//     next();
// });

// app.get('/api/users/:id', (req, res) => {
//     fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
//         if (err) return res.status(500).json({ error: "File read error" });
//         const users = JSON.parse(data);
//         const id = Number(req.params.id);
//         const user = users.find(u => u.id === id);
//         res.json(user || {});
//     });
// });

// app.post('/api/users', async (req, res) => {
//     fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
//         if (err) return res.status(500).json({ error: "File read error" });
//         const users = JSON.parse(data);
        
//     });
//     //mongoose wala user 
//     const result=await User.create({
//         firstName:req.body.first_name,
//         lastName:req.body.last_name,
//         email:req.body.email,
//         gender:req.body.gender,
//         jobTitle:req.body.job_title,

//     })
//     console.log("result",result);
//     return res.status(201).json({message:"successfully"});
// });

// app.delete('/api/users/:id', (req, res) => {
//     fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
//         if (err) return res.status(500).json({ error: "File read unsuccessful" });
//         let users = JSON.parse(data);
//         const id = Number(req.params.id);
//         users = users.filter(user => user.id !== id);
//         fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//             if (err) return res.status(500).json({ error: "File write unsuccessful" });
//             res.json({ status: 'Success', message: `User with id ${id} deleted` });
//         });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
// Express aur Mongoose import kar rahe hain
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware: request body ko parse karne ke liye
app.use(express.json()); // raw JSON handle karega (Postman raw → JSON)
app.use(express.urlencoded({ extended: false })); // form-data handle karega (HTML forms)

const PORT = 3000;

// MongoDB connection setup
// Agar "user-database" pehle se nahi hai, MongoDB automatically bana dega
mongoose.connect("mongodb://127.0.0.1:27017/user-database")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Mongoose Error:\n", err));

// User schema define kar rahe hain (yeh structure decide karega ki DB mein kya fields honge)
const userSchema = mongoose.Schema({
    first_name: { type: String, required: true }, // first_name compulsory hai
    last_name: { type: String },                  // last_name optional hai
    email: { type: String, required: true, unique: true }, // email compulsory + unique
    jobTitle: { type: String },                   // jobTitle optional hai
    gender: { type: String },                     // gender optional hai
  },
  { timestamps: true } // createdAt aur updatedAt automatically add ho jayenge
);

// Model banate hain jo "users" collection ko represent karega
const User = mongoose.model("user", userSchema);

// ------------------- ROUTES -------------------

// POST route → naya user create karne ke liye
app.post('/api/users/', async (req, res) => {
    const body = req.body;
    console.log("Request body keys:", Object.keys(req.body)); // debugging ke liye

    // Validation: check kar rahe hain ki sab required fields aaye hain ya nahi
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json("⚠️ All fields are required");
    }

    // User ko DB mein insert karna
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender,
    });

    console.log(result); // terminal mein inserted document print hoga
    return res.status(201).json({ status: 'success' });
});

// GET route → saare users ko HTML format mein dikhana
app.get('/users', async (req, res) => {
    //pehle hum saare users ko mockdata se fetch karke show karte the using map ,now we fetch from mongodb using mongoose
    //user,find({}) is a mingodb function which fetch all the data from the user collection
    const allDBUsers = await User.find({});
    const html =
        `<ul>${allDBUsers.map((user) => `<li>${user.first_name} - ${user.email} - ${user.jobTitle} - ${user.gender}</li>`).join("")}</ul>`;
    res.send(html);
});

// GET route → saare users ko JSON format mein dikhana
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

// GET route → ek specific user ko ID se find karna
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: '❌ User not found' });
    }
    return res.json(user);
});

// PATCH route → ek specific user ko update karna
app.patch('/api/users/:id', async (req, res) => {
    const User = await User.findByIdAndUpdate(req.params.id,{last_name:"karmakar"});
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.query, { new: true });
        if (!user) {
            return res.status(404).json({ error: '❌ User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '⚠️ Internal Server Error' });
    }
});

// DELETE route → ek specific user ko delete karna
app.delete('/api/users/:id', async (req, res) => {
    
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: '❌ User not found' });
        }
        return res.json({ message: '✅ User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '⚠️ Internal Server Error' });
    }
});

// Server start karna
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});