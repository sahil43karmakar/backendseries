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

//lets say below is te first middleware(M0),which did parsing or converting work,then it called the next middleware when M0 is done with its work
app.use(express.urlencoded({ extended: true }));

//WE MAKE A MIDDLEWARE WHICH WRITE IN FS MODULE THEN ,WHEN DONE WRITING ,WE CALL OUR NEXT MIDDLEWARE
app.use((req,res,next)=>{
    fs.appendFile("LOG1.txt",`${Date.now()}: ${req.method}: ${req.path}`,
    //after successfuly writing we send the request to the  next middleware 
    (err,data)=>{
        next();
    }


);
     

})


//if above middleware allows ,then only the client request acn succesfully do GET request 
app.get('/api/users', (req, res) => {
    console.log("")
    fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        res.json(JSON.parse(data)); // pura users list bhej do
    });
});

// Step 4: GET user by ID
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



app.delete('/api/users/:id', (req, res) => {
    

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



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

