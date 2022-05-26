import express from 'express';
import {productService} from '../services/services.js';
import productController from '../controllers/productsControllers.js';

const router = express.Router();

//GETS
router.get('/',productController.getProducts);
router.get('/:uid',productController.getOneProduct);

//POSTS
router.post('/',productController.addProduct);

//PUTS
router.put('/:uid',productController.editProduct);

//DELETES 
router.delete('/:uid',productController.deleteProduct);


export default router;

