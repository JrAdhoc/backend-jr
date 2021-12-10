import express from 'express';
import Contenedor from '../classes/Class.js';
import {io} from '../app.js'
const router = express.Router();
const carritoProdutos  = new Contenedor();

//GETS
router.get('/:uid/productos',(req,res)=>{
    let id = req.params.uid;
    carritoProdutos.getProductosCarrito(id).then(result=>{
        res.send(result);
    })
})

//POSTS
router.post('/',(req,res)=>{
    carritoProdutos.newCarrito().then(result=>{
        res.send(result);
    })
})

router.post('/:uid/productos',(req,res)=>{
    let id = parseInt(req.params.uid);
    let producto = req.body;
    carritoProdutos.agregarProductosCarrito(id,producto).then(result=>{
        res.send(result);   
    })
})

//DELETES
router.delete('/:uid',(req,res)=>{
    let id = req.params.uid;
    carritoProdutos.deleteCarrito(id).then(result=>{
        res.send(result);
    })
})

router.delete('/:uid/productos/:id_prod',(req,res)=>{
    let idCarrito = parseInt(req.params.uid);
    let idProd = parseInt(req.params.id_prod);
    carritoProdutos.deleteProductoCarrito(idCarrito,idProd).then(result=>{
        res.send(result);
    })
})
export default router;