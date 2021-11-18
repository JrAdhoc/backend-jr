import { getAll, getRandom } from './entrega2';

const fs = require('fs')
const express = require('express');

const app = express();

const PORT = 4000;

const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});

getAll();
getRandom();



app.get('/productos', (req, res) => {
    res.end(productos)
});

app.get('/producto-random', (req, res) => {
    res.end(productoRandom)
});
