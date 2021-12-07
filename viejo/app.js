// import { ContenedorImport } from './src/entrega2';
// const ContenedorImport = require('../src/entrega2');
// const contenedor = new ContenedorImport();
const router = express.Router();
import fs from 'fs';
import express from 'express';
import {engine} from 'express-handlebars';
import productsRouter from './src/routes/products';

import cors from 'cors';
const app = express();

const PORT = 4000;
const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/api/productos', productsRouter);

