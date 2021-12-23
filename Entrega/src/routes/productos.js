import express from 'express';
import Contenedor from '../classes/Class.js';
import {io} from '../app.js';
import { authMiddleware } from '../utils.js';
import Products from '../services/Products.js';
const router = express.Router();
const contenedorProdutos  = new Contenedor();
const productsService = new Products();

//GETS
router.get('/',(req,res)=>{
    productsService.getAll().then(result=>{
        res.send(result);   
    })
})

router.get('/:uid',(req,res)=>{
    let id = parseInt(req.params.uid);
    productsService.getProductById(id).then(result=>{
        console.log(result);
        res.send(result);
    })
})
//POSTS
router.post('/',authMiddleware,(req,res)=>{
    let producto = req.body;
    if(req.auth){
        if(!producto.title) return res.send({status:'error',message:'faltan datos'});
        if(!producto.price) return res.send({status:'error',message:'faltan datos'});
        if(!producto.thumbnail) return res.send({status:'error',message:'faltan datos'});
    productsService.registerProduct(producto).then(result=>{
        res.send(result);
    })}
})

//PUTS
router.put('/:uid',authMiddleware,(req,res)=>{
    let id = req.params.uid;
    let producto = req.body;
    if(req.auth)
    productsService.modifyProductById(id, producto).then(result=>{
        res.send(result);
    })
})

//DELETES 
router.delete('/:uid',authMiddleware,(req,res)=>{
    let id = req.params.uid;
    if(req.auth)
    productsService.deleteProductById(id).then(result=>{
        res.send(result);
    })
})


export default router;

