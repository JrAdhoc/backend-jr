const fs = require('fs')
const express = require('express');

const app = express();

const PORT = 4000;

const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
let productos;
let productoRandom;
let productosRandom;
function getAll() {


    try {
        const data = fs.readFileSync('./products.txt', 'utf8')
        if (data !== "") {
            productos = data;
            console.log(productos);
        }
    } catch (err) {
        console.error(err)
    };
    return productos;
};
getAll();

function getRandom() {
    try {
        const data = fs.readFileSync('./products.txt', 'utf8')
        if (data !== "") {
            productosRandom = JSON.parse(data);
            productoRandom = JSON.stringify(productosRandom[Math.floor(Math.random()*productosRandom.length)]);
        }
    } catch (err) {
        console.error(err)
    };
    return productoRandom;
};
getRandom();


app.get('/productos', (req, res) => {
    res.end(productos)
});

app.get('/producto-random', (req, res) => {
    res.end(productoRandom)
});
