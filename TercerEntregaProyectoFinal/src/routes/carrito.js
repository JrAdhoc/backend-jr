import express from 'express';
import {cartService} from '../services/services.js';
const router = express.Router();

//GETS
router.get('/',(req,res)=>{
    cartService.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/:uid/productos',(req,res)=>{
    let id = req.params.uid;
    cartService.getBy(id).then(result=>{
        res.send(result);
    })
})

//POSTS
router.post('/:uid/productos',(req,res)=>{
    let id = req.params.uid;
    let product = req.body;
    cartService.addProductCart(id,product).then(result=>{
        res.send(result);   
    })
})

//DELETES
router.delete('/:uid/productos/:id_prod',(req,res)=>{
    let idCart = req.params.uid;
    let idProduct = req.params.id_prod;
    cartService.removeProductCart(idCart,idProduct).then(result=>{
        res.send(result);
    })
})
export default router;