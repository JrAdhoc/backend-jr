const ContenedorImport = require('./entrega2');
const contenedor = new ContenedorImport();

const fs = require('fs')
const express = require('express');
const cors = require('cors')
const app = express();

const PORT = 4000;
const productsRouter = require('./routes/products');
const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/api/productos', productsRouter);
