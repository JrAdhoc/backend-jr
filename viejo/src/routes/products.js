const express = require('express');
const router = express.Router();
const ContenedorImport = require('../entrega2');
const contenedor = new ContenedorImport();

//GETS
router.get('/', (req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})
router.get('/:pid', (req,res)=>{
    let id= parseInt(req.params.pid);
    contenedor.getByID(id).then(result=>{
        res.send(result);
    })
})
router.get('/random', (req,res)=>{
    contenedor.getRandom().then(result=>{
        res.send(result);
    })
})
//POSTS
router.post('/', (req, res)=>{
    let producto = req.body;
    contenedor.save(producto).then(result=>{
        res.send(result);
    })
})

//PUTS
router.put('/:pid', (req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETES
router.delete('/:pid', (req, res)=>{
    let id= parseInt(req.params.pid);
    contenedor.deleteById(id).then(result=>{
        res.send(result);
    })
})


export default router;
