import express from 'express';
import Contenedor from '../contenedores/Class.js';
import {io} from '../app.js'
import { carrito } from '../daos/index.js';


const router = express.Router();
//GETS
router.get('/:uid/productos',(req,res)=>{
    let id = req.params.uid;
    carrito.getById(id).then(result=>{
        res.send(result);
    })
})

//POSTS
router.post('/',(req,res)=>{
    carrito.crearCarrito().then(result=>{
        res.send(result);
    })
})

router.post('/:uid/productos',(req,res)=>{
    let id = parseInt(req.params.uid);
    let producto = req.body;
    carrito.addToCart(id,producto).then(result=>{
        res.send(result);   
    })
})

//DELETES
router.delete('/:uid',(req,res)=>{
    let id = req.params.uid;
    carrito.deleteCarrito(id).then(result=>{
        res.send(result);
    })
})

router.delete('/:uid/productos/:id_prod',(req,res)=>{
    let idCarrito = parseInt(req.params.uid);
    let idProd = parseInt(req.params.id_prod);
    carrito.deleteProductoCarrito(idCarrito,idProd).then(result=>{
        res.send(result);
    })
})
export default router;
