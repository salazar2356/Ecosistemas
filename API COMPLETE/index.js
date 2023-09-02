//server
const express = require('express');
const app = express()
const port = 3000

//Use Json Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Import the cors package
const cors = require('cors');
const { log } = require('console');

//Arreglo
let users = [];

//HTTP
users.push(
    {
        name:"Isa",
        lastname: "Salazar",
        age: 20,
        id:"142356",
        email:"isasalazar@gmail.com"
    },
    {
        name:"Luisa",
        lastname: "Molina",
        age: 21,
        id:"124556",
        email:"luisamol@gmail.com"
    },
    {
        name:"David",
        lastname: "Castaño",
        age: 24,
        id:"458765",
        email:"davidc@gmail.com"
    }
)

//METODO PARA PEDIR USUARIO POR ID

// después del slash DE LA RUTA se interpreta como lo que debe guardar los datos que están después del slash de POSTMAN
app.get('/users/:id', (req, res)=>{

    console.log("params", req.params);
//Constante ID dentro del contexto
    const requestId = req.params.id
//Busca quien tiene id
    let requireUser = "null";

    for (let index = 0; index < users.length; index++) {
        console.log(users[index].id === requestId,users[index].id, requestId);

        if(users[index].id == requestId){
            requireUser = users[index];
    }
}
    console.log(requireUser); 
    res.json(requireUser)     
    }
)


app.get('/users', (req, res) =>{

    if(req.query.age){

    users = users.filter(
        (user)=>
        {
            console.log("comp", user.age == req.query.age);
            return user.age == req.query.age
        }
    )
}
    res.send({"users": users})
})

//Users QUERY
//RETORNA Y FILTRA LOS USERS

app.post('/users', (req, res)=> {

    let newUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        id: req.body.id,
        email: req.body.email,
    }
    //cuando haga un get a los usuarios me va a traer lo que acaba de crear desde post body
    users.push(newUser)
    res.send("Creación exitosa")
    //CREA USUARIOS
    //Para probar y que me quede en el get tengo que enviar en post y enviar en get
});

app.get('/', (req,res)=>{
    res.send("Bienvenidos a la API de usuarios")
})

app.delete('/users/:id', (req,res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = users.findIndex(user=>user.id==idToDelete)
    let userDelete = users.splice(indexToDelete, 1)
    res.send("Se eliminó correctamente el usuario con id: "+ userDelete[0].id)

})

//Listener

app.listen(port, () =>{
    console.log(`Bienvenidos a la API ${port}`)
});