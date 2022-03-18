import express from 'express';
import {productService} from '../services/services.js';
const router = express.Router();

//GETS
router.get('/',(req,res)=>{
    productService.getAll().then(result=>{
        let renderObj ={
            products:result,
        }
        res.render('Home',renderObj)
    })
})

router.get('/:uid',(req,res)=>{
    let id = req.params.uid;
    productService.getBy(id).then(result=>{
        console.log(result);
        res.send(result);
    })
})
//POSTS
router.post('/',(req,res)=>{
    let product = req.body;
    productService.save(product).then(result=>{
        res.send({message:"Loaded product!", payload:result});
    })
})

//PUTS
router.put('/:uid',(req,res)=>{
    let id = req.params.uid;
    let product = req.body;
    if(req.auth)
    productService.update(id, product).then(result=>{
        res.send(result);
    })
})

//DELETES 
router.delete('/:uid',(req,res)=>{
    let id = req.params.uid;
    productService.delete(id).then(result=>{
        res.send(result);
    })
})


export default router;

