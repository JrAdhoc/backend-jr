import express from 'express';
import Contenedor from '../contenedores/Class.js';
import {io} from '../app.js';
import { authMiddleware } from '../utiles.js';
import { productos } from '../daos/index.js';


const router = express.Router();
const contenedorProductos  = new Contenedor();

//GETS
router.get('/',(req,res)=>{
    productos.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/:uid',(req,res)=>{
    let id = parseInt(req.params.uid);
    productos.getById(id).then(result=>{
        console.log(result);
        res.send(result);
    })
})
//POSTS
router.post('/',authMiddleware,(req,res)=>{
    let producto = req.body;
    if(req.auth)
    productos.saveOne(producto).then(result=>{
        res.send(result);
    })
})

//PUTS
router.put('/:uid',authMiddleware,(req,res)=>{
    let id = req.params.uid;
    let producto = req.body;
    if(req.auth)
    productos.updateById(id, producto).then(result=>{
        res.send(result);
    })
})

//DELETES 
router.delete('/:uid',authMiddleware,(req,res)=>{
    let id = req.params.uid;
    if(req.auth)
    productos.deleteById(id).then(result=>{
        res.send(result);
    })
})
router.delete('/',(req,res)=>{
    productos.deleteAll().then(result=>{
        res.send(result);
    })
})


export default router;

