import express from 'express';
import cartControllers from '../controllers/cartControllers.js';
const router = express.Router();

//GETS
router.get('/:uid',cartControllers.getCart);

//POSTS
router.post('/',cartControllers.generateCart);
router.post('/:cid/products/:pid',cartControllers.addProductCart);
router.post('/purchase/:cid',cartControllers.confirmPurchase);

//PUTS
router.put('/:cid',cartControllers.updateCart);
//DELETES
router.delete('/:cid/products/:pid',cartControllers.deleteProductCart);

export default router;