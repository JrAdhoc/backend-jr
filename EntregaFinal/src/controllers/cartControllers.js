import { cartService, productService } from "../services/services.js";
import logger from "../utils/logger.js";

const getCart = async(req,res)=>{
    try {
        let id = req.params.uid;
        cartService.getBy({_id:id}).then(result=>{
            res.send({status:"success",payload:result});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const generateCart = async(req,res)=>{
    try {
        cartService.save().then(result=>{
            res.send({status:"success",payload:result});
        })
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const addProductCart = async(req,res)=>{
    let quantityChanged = false;
    let { cid, pid} = req.params;
    let { quantity } = req.body;
    try {
        //VALIDACION PRODUCTO
        let product = await productService.getBy({_id:pid});
        if(!product) return res.status(404).send({status:'error',error:'Product not found'});
        //VALIDACION CARRITO
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error',error:'Cart not found'});
        //VALIDACION STOCK
        if(!product.stock===0) return res.status(400).send({status:'error',error:'No stock'});
        //VALIDACION QUANTITY
        if(product.stock<quantity){
            quantity = product.stock
            quantityChanged = true
        };
        product.stock = product.stock - quantity;
        if(product.stock === 0){
            product.status = 'unaviable'
        }
        cart.products.push({product:pid,quantity});
        await cartService.update(cid,cart);
        res.send({satuts:'success',quantityChanged,newQuantity:quantity,message:'Product added in cart'});
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}



const deleteProductCart = async(req,res)=>{
    let { cid, pid } = req.params;
    try {
        //VALIDACION CARRO
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart not found'});

        if(cart.products.some(element=>element.product._id.toString()==pid)){
            let product = await productService.getBy({_id:id});
            if(!product) return res.status(404).send({stauts:'error',error:'Product not found'});

            let productInCart = cart.products.find(element=>element.product._id.toString()===pid);

            product.stock = product.stock + productInCart.quantity;
            await productService.update(pid,product);

            cart.products = cart.products.fiter(element=>element.product._id.toString()!==pid);
            await cartService.update(cid,cart);
            res.send({status:'success',message:'product deleted'});
        }
    } catch (error) {
        logger.error(error);
        res.send({status:"error",error:error});
    }
}

const updateCart = async(req,res)=>{
    let{ cid } = req.params;
    let { products } = req.body;
    let stockLimitation = false;
    //VALIDACION CARRO
    let cart = await cartService.getBy({_id:id});
    if(!cart) return res.status(404).send({status:"error",error:"Cant find cart"});
    //VALIDACION PRODUCTO EN CARRO
    for(const element of cart.products){
        let product = await productService.getBy({_id:element.product});

        let associatedProductInCart = cart.products.find(element=>element.product._id.toString()===product._id.toString());
        let associatedProductInInput = products.find(element=>element.product.toString()===product._id.toString());
        if(associatedProductInCart.quantity!==associatedProductInInput.quantity){
            //Ask if the requested quantity is less than the current quantity of the cart
            if(associatedProductInCart.quantity>associatedProductInInput.quantity){
                let difference = associatedProductInCart.quantity - associatedProductInInput.quantity;
                associatedProductInCart.quantity = associatedProductInInput.quantity;
                product.stock+=difference;
                await productService.update(product._id,product);
            }else{
                let difference = associatedProductInInput.quantity - associatedProductInCart.quantity;
                if(product.stock>=difference){//It's ok. We can add it to the cart
                    product.stock -=difference;
                    await productService.update(product._id,product);
                    associatedProductInCart.quantity = associatedProductInInput.quantity;
                }
                else{//There's no sufficient stock to add to the cart
                    stockLimitation=true;
                    associatedProductInCart.quantity +=product.stock;
                    product.stock=0;
                    await productService.update(product._id,product);
                }
            }
        }
        else{
            console.log("La cantidad para este producto no cambió")
        }
    }
    await cartService.update(cid,cart);
    res.send({status:"success",stockLimitation})
}

const confirmPurchase = async(req,res)=>{
    let { cid } = req.params;
    try{
        //Check cart
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart Not Found'});
        //Empty cart
        cart.products=[];
        await cartService.update(cid, cart);
        res.status(200).send({status:'success', message:'Finished purchase'});
    }catch(error){
        logger.error(error);
        res.stauts(500).send({status:'error', error:error});
    }
}

export default{
    getCart,
    generateCart,
    addProductCart,
    deleteProductCart,
    updateCart,
    confirmPurchase
}
