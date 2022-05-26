import { productService } from "../services/services.js";
import logger from "../utils/logger.js";

const getProducts = async(req,res)=>{
    try {
        productService.getAll().then(result=>{
            res.send({status:"success",payload:result});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const getOneProduct = async(req,res)=>{
    try {
        let id = req.params.uid;
        productService.getBy({_id:id}).then(result=>{
            console.log(result);
            res.send({status:"success",payload:result});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const addProduct = async(req,res)=>{
    try {
        let product = req.body;
        productService.save(product).then(result=>{
            res.send({message:"success", payload:result});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const editProduct = async(req,res)=>{
    try {
        let id = req.params.uid;
        let product = req.body;
        if(req.auth)
        productService.update(id, product).then(result=>{
            res.send({status:"success",payload:result});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const deleteProduct = async(req,res)=>{
    try {
        let id = req.params.uid;
        productService.delete(id).then(result=>{
            res.send({status:"success",message:"Product deleted"});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}


export default{
    getProducts,
    getOneProduct,
    addProduct,
    editProduct,
    deleteProduct
}