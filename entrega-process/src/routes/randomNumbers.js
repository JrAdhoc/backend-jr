import express from 'express';

const router = express.Router();

router.get('/api/random',(req,res)=>{
    let cant = req.query.cant || 100000000;
    let numbers;

    for(i=0;i<cant.length;i++){
        let number = 
    }
})