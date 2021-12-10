import express from 'express';
import Contenedor from '../classes/Class.js';
import {io} from '../app.js';
import { authMiddleware } from '../utils.js';
const router = express.Router();
const contenedorProdutos  = new Contenedor();

//GETS
router.get('/',(req,res)=>{
    contenedorProdutos.getAll().then(result=>{
        res.send(result);   
    })
})

router.get('/:uid',(req,res)=>{
    let id = parseInt(req.params.uid);
    contenedorProdutos.getById(id).then(result=>{
        console.log(result);
        res.send(result);
    })
})
//POSTS
router.post('/',authMiddleware,(req,res)=>{
    let producto = req.body;
    if(req.auth)
    contenedorProdutos.save(producto).then(result=>{
        res.send(result);
    })
})

//PUTS
router.put('/:uid',authMiddleware,(req,res)=>{
    let id = req.params.uid;
    let producto = req.body;
    if(req.auth)
    contenedorProdutos.editProduct(id, producto).then(result=>{
        res.send(result);
    })
})

//DELETES 
router.delete('/:uid',authMiddleware,(req,res)=>{
    let id = req.params.uid;
    if(req.auth)
    contenedorProdutos.deleteById(id).then(result=>{
        res.send(result);
    })
})


export default router;

