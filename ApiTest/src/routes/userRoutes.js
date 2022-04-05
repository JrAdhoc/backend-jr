import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/getusers',userController.getUsers);
router.post('/adduser',userController.saveUser);
router.delete('/deleteuser',userController.deleteUser);

export default router;