const express = require("express");
const app = express();
const cors = require('cors');  //Sin esta linea no conectaria a netlify
app.use(express.json());//Simepre que requiera enviar datos por post, put o delete y sean json se ocupa esta linea
require('dotenv').config();  //Importar libreria
const port = process.env.PORT;  //Para que se configure un puerto disponible si el mio esta ocupado y se lee asi
app.use(cors()); // Es para usarlo en un servidor diferente al proyecto

let platillos = [
    {
        id: 1,
        nombre: "Guacamole",
        precio: 20.35
    }
];


app.get('/', (req, res) => {
    res.send('¡Hola, Express');
});


app.get('/platillos', (req, res) => {
    //listar platillos
    res.json({
        mensaje: "platillos disponibles",
        data: platillos
    });
});

app.post('/platillos', (req, res) => {
    // console.log(req.body);
    //agregar platillos
    let nuevoPlatillo = req.body;
    platillos.push(nuevoPlatillo);
    res.json({
        mensaje: "Se agrego el platillo",
        data: nuevoPlatillo
    });
});

app.put('/platillos/:id', (req, res) => {
    //Actualizar platillos
    const id = parseInt(req.params.id);
    let platilloResultado = platillos.find(platillo => platillo.id === id);
    platilloResultado.nombre = req.body.nombre;
    platilloResultado.precio = req.body.precio;
    platilloResultado.descripcion = req.body.descripcion;
    res.send('Actualizar platillos');
});

app.delete('/platillos/:id', (req, res) => {
    //Eliminar platillos
    const id = parseInt(req.params.id);
    // validar el id exista
    const indice = platillos.findIndex(platillo => platillo.id === id);
    platillos.splice(indice, 1);
    res.json({
        mensaje: "Se elimino el platillo",
        data: null
    });
});

app.listen(port, ()=> {
    console.log('Servidor escuchando en http://localhost:' + port);
});