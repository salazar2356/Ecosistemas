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


const { z } = require('zod'); // Importa z de zod

app.listen(port, () =>{
    console.log(`Example ${port}`);
})

//ARREGLOS

const users = [];
const animals = [];
const vets = [];


//PUSH

users.push(
   {
    name:"Isa",
    lastname: "Salazar",
    age: 20,
    id:"1423",
    email:"isasalazar@gmail.com"
   }, 
   {
    name:"Alex",
    lastname: "Rueda",
    age: 21,
    id:"4056",
    email:"alex@gmail.com"
})

animals.push(
   
    {
        name:"Café",
        age: 5,
        id:"3",
        tipo:"Perro",
        id_vet:"1323",
        id_acudiente:"4056",
    },
    {
        name:"Asamy",
        age: 3,
        id:"4",
        tipo:"Perro",
        id_vet:"2348",
        id_acudiente:"1423",
}),

 vets.push(
      {
        name:"Angie",
        lastname: "Velez",
        id:"1323",
       }, 
       {
        name:"Camilo",
        lastname: "Castaño",
        id:"2348",
       }),
    

//TRAER ARREGLOS
app.get('/users', (req,res) =>{
    res.send({"users": users})
})

app.get('/animals', (req,res) =>{
    res.send({"animals": animals})

})

app.get('/vets', (req,res) =>{
    res.send({"vets": vets})

})

//MÉTODO POST

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

app.post('/animals', (req ,res) => {
   
    let newAnimal  = {

        name:req.body.name,
        age: req.body.age,
        id:req.body.id,
        tipo: req.body.tipo,
        id_vet: req.body.id_vet,
        id_acudiente: req.body.id_acudiente

    }

    animals.push(newAnimal);
    res.send("new animal")
    
})

app.post('/vets', (req ,res) => {
   
    let newVet  = {

        name:req.body.name,
        lastname: req.body.lastname ,
        id: req.body.id,

    }

    vets.push(newVet);
    res.send("new vet")
    
})
//ZOD 

const animalSchema = z.object({
    name: z.string(),
    age: z.number(),
    id: z.string(),
    tipo: z.string(),
    id_vet: z.string(),
    id_acudiente: z.string(),
  });

  app.patch('/animals/:id_vet', (req, res) => {
    const animalIdVet = req.params.id_vet; // Obtenemos el ID del animal de la URL
    const updatedData = req.body; // Los datos actualizados se encuentran en el cuerpo de la solicitud
  
    // Validamos los datos de entrada contra el esquema
    try {
      animalSchema.parse(updatedData);
    } catch (error) {
      return res.status(400).json({ error: 'Datos de entrada no válidos' });
    }
  
    // Buscamos el animal en el arreglo por su ID
    const animalToUpdate = animals.find(animal => animal.id_vet === animalIdVet);
    if (!animalToUpdate) {
        return res.status(404).json({ error: 'Animal no encontrado' });
      }
    
      // Actualizamos los datos del animal con los datos proporcionados en la solicitud
      Object.assign(animalToUpdate, updatedData);
    
      // Devolvemos una respuesta con el animal actualizado
      return res.json({ message: 'ID de veterinario de la mascota actualizado', animal: animalToUpdate });
    });
  
    app.delete('/animals/:id', (req,res)=>{
        const idToDelete = req.params.id;
        let indexToDelete = animals.findIndex(user=>user.id==idToDelete)
        let userDelete = animals.splice(indexToDelete, 1)
        res.send("Se eliminó correctamente la mascota con id: "+ userDelete[0].id)
    })

   
    
    
    
    
      