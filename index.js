const express = require("express")
const app = express();
const port = 3000;

//Use Json Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Import the cors package
const cors = require('cors');
const { log } = require('console');
const { request } = require('http');


const zod = require ('zod');

app.listen(port, () =>{
    console.log(`Example ${port}`);
})

const users = [];

users.push(
    {
        name:"Isa",
        lastname: "Salazar",
        age: 20,
        id:"142356",
        email:"isasalazar@gmail.com"
    }),
    
app.get('/users', (req,res) =>{
    res.send({"users": users})

})

app.post('/users', (req ,res) => {
   
    let newUser  = {

    name: req.body.name,
    last: req.body.last,
    age: req.body.age,
    id: req.body.id

    }

    users.push(newUser);
    res.send("new user")
    

})


