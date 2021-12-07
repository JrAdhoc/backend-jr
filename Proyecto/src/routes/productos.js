import express from 'express';
import Contenedor from '../classes/Class.js';
import {io} from '../app.js'
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
        res.send(result);
    })
})
//POSTS
router.post('/',(req,res)=>{
    let producto = req.body;
    contenedorProdutos.save(producto).then(result=>{
        res.send(result);
        if(result.status==="success"){
            contenedorProdutos.getAll().then(result=>{
                io.emit('updateProducts',result);
            })
        }
    })
})

//PUTS
router.put('/:uid',(req,res)=>{
    let id = req.params.uid;
    let producto = req.body;
    contenedorProdutos.editProduct(id, producto).then(result=>{
        res.send(result);
    })
})

//DELETES 
router.delete('/:uid',(req,res)=>{
    let id = req.params.uid;
    contenedorProdutos.deleteById(id).then(result=>{
        res.send(result);
    })
})


export default router;

